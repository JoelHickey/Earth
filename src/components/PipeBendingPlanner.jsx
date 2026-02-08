import React, { useMemo, useState } from 'react';
import Header from '../../components/Header';

const STORAGE_KEY = 'pipe-bending-planner-project';

const createEmptyBend = () => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  angle: '',
  legLength: '75',
  direction: 'left',
  flipHorizontal: false
});

const createPartId = () => `part-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const formatNumber = (value) => {
  if (Number.isNaN(value) || value === null || value === undefined) {
    return '--';
  }
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const buildPreviewPath = (bends, clr, follower = 0, addFollowerEachBend = false, startAngleDegrees = 0) => {
  const radius = parseFloat(clr);
  if (!Number.isFinite(radius) || radius <= 0) {
    return null;
  }

  let x = 0;
  let y = 0;
  let angle = (startAngleDegrees * Math.PI) / 180;
  const startAngle = angle;
  const points = [{ x, y }];
  const legCommands = [];
  const followerCommands = [];
  const arcCommands = [];
  const legSegments = [];
  const arcSegments = [];

  bends.forEach((bend) => {
    const leg = parseFloat(bend.legLength);
    if (Number.isFinite(leg) && leg !== 0) {
      const startX = x;
      const startY = y;
      x += leg * Math.cos(angle);
      y += leg * Math.sin(angle);
      legCommands.push(`M ${startX} ${startY} L ${x} ${y}`);
      points.push({ x, y });
    legSegments.push({
        x1: startX,
        y1: startY,
        x2: x,
        y2: y,
      length: leg
      });
    }

    const bendAngle = parseFloat(bend.angle);
    if (Number.isFinite(bendAngle) && bendAngle !== 0) {
      const baseTurn = (Math.PI / 180) * bendAngle;
      const dirTurn = bend.direction === 'left' ? baseTurn : -baseTurn;
      const turn = bend.flipHorizontal ? -dirTurn : dirTurn;
      const startX = x;
      const startY = y;
      const leftNormal = { x: -Math.sin(angle), y: Math.cos(angle) };
      const normal = turn >= 0 ? leftNormal : { x: -leftNormal.x, y: -leftNormal.y };
      const centerX = startX + normal.x * radius;
      const centerY = startY + normal.y * radius;
      const centerAngle = Math.atan2(startY - centerY, startX - centerX);
      const endCenterAngle = centerAngle + turn;
      const sampleCount = Math.max(6, Math.ceil(Math.abs(bendAngle) / 15));

      arcCommands.push(`M ${startX} ${startY}`);
      for (let i = 1; i <= sampleCount; i += 1) {
        const step = i / sampleCount;
        const sampleAngle = centerAngle + turn * step;
        const sx = centerX + radius * Math.cos(sampleAngle);
        const sy = centerY + radius * Math.sin(sampleAngle);
        points.push({ x: sx, y: sy });
        arcCommands.push(`L ${sx} ${sy}`);
      }

      const endX = centerX + radius * Math.cos(endCenterAngle);
      const endY = centerY + radius * Math.sin(endCenterAngle);
      arcSegments.push({
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY
      });

      x = endX;
      y = endY;
      angle = angle + turn;

      const followerValue = parseFloat(follower);
      if (addFollowerEachBend && Number.isFinite(followerValue) && followerValue > 0) {
        const followerStartX = x;
        const followerStartY = y;
        x += followerValue * Math.cos(angle);
        y += followerValue * Math.sin(angle);
        legSegments.push({
          x1: followerStartX,
          y1: followerStartY,
          x2: x,
          y2: y,
          length: followerValue,
          isFollower: true
        });
        points.push({ x, y });
        followerCommands.push(`M ${followerStartX} ${followerStartY} L ${x} ${y}`);
      }
    }
  });

  if (points.length < 2) {
    return null;
  }
  const endAngle = angle;

  const rawBounds = points.reduce(
    (acc, point) => ({
      minX: Math.min(acc.minX, point.x),
      minY: Math.min(acc.minY, point.y),
      maxX: Math.max(acc.maxX, point.x),
      maxY: Math.max(acc.maxY, point.y)
    }),
    { minX: points[0].x, minY: points[0].y, maxX: points[0].x, maxY: points[0].y }
  );
  const padding = radius + 20;
  const bounds = {
    minX: rawBounds.minX - padding,
    minY: rawBounds.minY - padding,
    maxX: rawBounds.maxX + padding,
    maxY: rawBounds.maxY + padding
  };

  return {
    legD: legCommands.join(' '),
    followerD: followerCommands.join(' '),
    arcD: arcCommands.join(' '),
    bounds,
    rawBounds,
    start: points[0],
    end: { x, y },
    startAngle,
    endAngle,
    legSegments,
    arcSegments
  };
};

const PipeBendingPlanner = ({ onClose, position, onDragStart, onBringToFront, zIndex = 140 }) => {
  const [projectName, setProjectName] = useState('Steel Pipe Prototype');
  const [requiredHeight, setRequiredHeight] = useState('1500');
  const [requiredLength, setRequiredLength] = useState('3008');
  const [pipeOd, setPipeOd] = useState('33.7');
  const [pipeId, setPipeId] = useState('28.5');
  const [wallThickness, setWallThickness] = useState('2.6');
  const [centerLineRadius, setCenterLineRadius] = useState('115');
  const [maxAngle, setMaxAngle] = useState('180');
  const [minLeg, setMinLeg] = useState('75');
  const [kFactor, setKFactor] = useState('0.4');
  const [springback, setSpringback] = useState('0');
  const [followerLength, setFollowerLength] = useState('151');
  const [offcutLength, setOffcutLength] = useState('0');
  const initialPartId = createPartId();
  const [parts, setParts] = useState([
    { id: initialPartId, bends: [createEmptyBend()], startAngle: 0, joinToPrevious: false, joinType: 'Weld', joinOverlap: '0', startOffsetX: '0', startOffsetY: '0' }
  ]);
  const [activePartId, setActivePartId] = useState(() => initialPartId);
  const [openMenu, setOpenMenu] = useState(null);

  const unitLabel = 'mm';
  const pipeOdOptions = [
    {
      id: '25-light',
      od: '33.7',
      wall: '2.6',
      pipeId: '28.5',
      price: '$62.00',
      length: '6.5 M',
      grade: 'Light',
      weight: '1.99'
    },
    {
      id: '25-medium',
      od: '33.7',
      wall: '3.2',
      pipeId: '27.3',
      price: '$75.00',
      length: '6.5 M',
      grade: 'Medium',
      weight: '2.41'
    },
    {
      id: '25-heavy',
      od: '33.7',
      wall: '4.0',
      pipeId: '25.7',
      price: '$110.00',
      length: '6.5 M',
      grade: 'Heavy',
      weight: '2.94'
    }
  ];

  const selectedPipe = pipeOdOptions.find(
    (option) => option.od === pipeOd && option.wall === wallThickness
  );
  const pipePrice = selectedPipe ? parseFloat(selectedPipe.price.replace(/[^0-9.]/g, '')) : null;
  const pipeUnitCost = pipePrice ? pipePrice / 6500 : null;

  const handlePipeOdChange = (event) => {
    const nextValue = event.target.value;
    const [nextOd, nextWall] = nextValue.split('|');
    const match = pipeOdOptions.find((option) => option.od === nextOd && option.wall === nextWall);
    if (match) {
      setPipeOd(match.od);
      setWallThickness(match.wall);
      setPipeId(match.pipeId);
    } else {
      setPipeOd(nextOd || '');
    }
  };

  const activePartIndex = Math.max(0, parts.findIndex((part) => part.id === activePartId));
  const activePart = parts[activePartIndex];
  const activeBends = activePart?.bends || [];

  const buildBendRows = (partBends) => {
    return partBends.map((bend, index) => {
      const angleInput = parseFloat(bend.angle);
      const springbackValue = parseFloat(springback);
      const angle = Number.isFinite(angleInput)
        ? angleInput + (Number.isFinite(springbackValue) ? springbackValue : 0)
        : angleInput;
      const clr = parseFloat(centerLineRadius);
      const od = parseFloat(pipeOd);
      const wall = parseFloat(wallThickness);
      const k = parseFloat(kFactor);
      const neutralAxisRadius = Number.isFinite(clr) && Number.isFinite(od) && Number.isFinite(wall) && Number.isFinite(k)
        ? clr - (od / 2) + (k * wall)
        : clr;
      const legLength = parseFloat(bend.legLength);
      const arcLength = Number.isFinite(angle) && Number.isFinite(neutralAxisRadius)
        ? (Math.PI * angle * neutralAxisRadius) / 180
        : null;
      return {
        ...bend,
        index: index + 1,
        arcLength,
        developedLength: Number.isFinite(arcLength) && Number.isFinite(legLength)
          ? arcLength + legLength
          : null
      };
    });
  };

  const bendRows = useMemo(() => {
    return buildBendRows(activeBends);
  }, [activeBends, centerLineRadius, pipeOd, wallThickness, kFactor, springback]);
  const isPrimaryPartComplete = activePartIndex === 0 && bendRows.length > 0 && bendRows.every((bend) => (
    String(bend.legLength || '').trim() !== '' && String(bend.angle || '').trim() !== ''
  ));

  const totals = useMemo(() => {
    const totalLeg = bendRows.reduce((sum, bend) => sum + (parseFloat(bend.legLength) || 0), 0);
    const totalArc = bendRows.reduce((sum, bend) => sum + (bend.arcLength || 0), 0);
    const follower = parseFloat(followerLength) || 0;
    const followerCount = bendRows.length;
    const totalLength = totalLeg + totalArc;
    return {
      totalLeg,
      totalArc,
      totalLength,
      cutLength: totalLength + (follower * followerCount)
    };
  }, [bendRows, followerLength]);

  const markStops = useMemo(() => {
    const marks = [{ label: 'Start', pos: 0 }];
    const segments = [];
    const follower = parseFloat(followerLength) || 0;
    let runningTotal = 0;
    bendRows.forEach((bend) => {
      const leg = parseFloat(bend.legLength) || 0;
      const arc = Number.isFinite(bend.arcLength) ? bend.arcLength : 0;
      const legEnd = runningTotal + leg;
      const bendEnd = legEnd + arc;
      const followerEnd = bendEnd + follower;
      segments.push({ from: runningTotal, to: legEnd, color: '#000000', length: leg });
      segments.push({ from: legEnd, to: bendEnd, color: '#0057ff', length: arc });
      segments.push({ from: bendEnd, to: followerEnd, color: '#ff8a00', length: follower });
      marks.push({ label: `L${bend.index}`, pos: legEnd });
      marks.push({ label: `B${bend.index}`, pos: bendEnd });
      marks.push({ label: `F${bend.index}`, pos: followerEnd });
      runningTotal = followerEnd;
    });
    const maxPos = marks.reduce((max, mark) => Math.max(max, mark.pos), 0);
    return { marks, segments, maxPos };
  }, [bendRows, followerLength]);

  const markLabelFontSize = Math.max(7, 10 - Math.floor(markStops.marks.length / 6));

  const machineWarnings = useMemo(() => {
    const warnings = [];
    const maxAngleValue = parseFloat(maxAngle);
    const minLegValue = parseFloat(minLeg);
    const defaultRadiusValue = parseFloat(centerLineRadius);

    bendRows.forEach((bend) => {
      const angle = parseFloat(bend.angle);
      const radius = parseFloat(centerLineRadius);
      const legLength = parseFloat(bend.legLength);
      if (Number.isFinite(maxAngleValue) && Number.isFinite(angle) && angle > maxAngleValue) {
        warnings.push(`Bend ${bend.index}: angle exceeds ${maxAngleValue}°`);
      }
      if (Number.isFinite(minLegValue) && Number.isFinite(legLength) && legLength < minLegValue) {
        warnings.push(`Bend ${bend.index}: leg below ${minLegValue} ${unitLabel}`);
      }
      if (Number.isFinite(defaultRadiusValue) && Number.isFinite(radius) && radius < defaultRadiusValue) {
        warnings.push(`Bend ${bend.index}: radius below ${defaultRadiusValue} ${unitLabel}`);
      }
    });

    return warnings;
  }, [bendRows, centerLineRadius, maxAngle, minLeg, unitLabel]);

  const updateBend = (id, field, value) => {
    setParts((prev) => prev.map((part) => {
      if (part.id !== activePartId) {
        return part;
      }
      return {
        ...part,
        bends: part.bends.map((bend) => (
          bend.id === id ? { ...bend, [field]: value } : bend
        ))
      };
    }));
  };

  const addBend = () => {
    setParts((prev) => prev.map((part) => {
      if (part.id !== activePartId) {
        return part;
      }
      return {
        ...part,
        bends: [...part.bends, createEmptyBend()]
      };
    }));
  };

  const removeBend = (id) => {
    setParts((prev) => prev.map((part) => {
      if (part.id !== activePartId) {
        return part;
      }
      return {
        ...part,
        bends: part.bends.filter((bend) => bend.id !== id)
      };
    }));
  };

  const addPart = () => {
    const nextId = createPartId();
    setParts((prev) => {
      const nextStartAngle = prev.length === 1 ? 90 : 0;
      return [
        ...prev,
        { id: nextId, bends: [createEmptyBend()], startAngle: nextStartAngle, joinToPrevious: true, joinType: 'Weld', joinOverlap: '0', startOffsetX: '0', startOffsetY: '0' }
      ];
    });
    setActivePartId(nextId);
  };

  const removePart = () => {
    setParts((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      const nextParts = prev.filter((part) => part.id !== activePartId);
      const nextIndex = Math.max(0, activePartIndex - 1);
      const nextActive = nextParts[nextIndex]?.id || nextParts[0]?.id;
      if (nextActive) {
        setActivePartId(nextActive);
      }
      return nextParts;
    });
  };

  const resetProject = () => {
    const nextId = createPartId();
    setProjectName('Steel Pipe Prototype');
    setRequiredHeight('1500');
    setRequiredLength('3008');
    setPipeOd('33.7');
    setPipeId('28.5');
    setWallThickness('2.6');
    setCenterLineRadius('115');
    setMaxAngle('180');
    setMinLeg('75');
    setKFactor('0.4');
    setSpringback('0');
    setFollowerLength('151');
    setOffcutLength('0');
    setParts([{ id: nextId, bends: [createEmptyBend()], startAngle: 0, joinToPrevious: false, joinType: 'Weld', joinOverlap: '0', startOffsetX: '0', startOffsetY: '0' }]);
    setActivePartId(nextId);
  };

  const handleSave = () => {
    const payload = {
      projectName,
      requiredHeight,
      requiredLength,
      pipeOd,
      centerLineRadius,
      kFactor,
      springback,
      followerLength,
      offcutLength,
      maxAngle,
      minLeg,
      parts,
      activePartId
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const handleLoad = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const payload = JSON.parse(raw);
      setProjectName(payload.projectName || '');
      setRequiredHeight(payload.requiredHeight || '');
      setRequiredLength(payload.requiredLength || '');
      setPipeOd(payload.pipeOd || '');
      setCenterLineRadius(payload.centerLineRadius || '');
      setKFactor(payload.kFactor || '0.4');
      setSpringback(payload.springback || '0');
      setFollowerLength(payload.followerLength || '151');
      setOffcutLength(payload.offcutLength || '0');
      setMaxAngle(payload.maxAngle || '');
      setMinLeg(payload.minLeg || '');
      if (Array.isArray(payload.parts) && payload.parts.length > 0) {
        setParts(payload.parts.map((part) => ({
          ...part,
          startAngle: Number.isFinite(part.startAngle) ? part.startAngle : 0,
          bends: Array.isArray(part.bends) && part.bends.length > 0 ? part.bends : [createEmptyBend()],
          joinToPrevious: Boolean(part.joinToPrevious),
          joinType: part.joinType || 'Weld',
          joinOverlap: part.joinOverlap || '0',
          startOffsetX: part.startOffsetX || '0',
          startOffsetY: part.startOffsetY || '0'
        })));
        const nextActive = payload.activePartId || payload.parts[0]?.id;
        if (nextActive) {
          setActivePartId(nextActive);
        }
      } else if (Array.isArray(payload.bends) && payload.bends.length > 0) {
        const nextId = createPartId();
        setParts([{ id: nextId, bends: payload.bends, startAngle: 0, joinToPrevious: false, joinType: 'Weld', joinOverlap: '0', startOffsetX: '0', startOffsetY: '0' }]);
        setActivePartId(nextId);
      } else {
        const nextId = createPartId();
        setParts([{ id: nextId, bends: [createEmptyBend()], startAngle: 0, joinToPrevious: false, joinType: 'Weld', joinOverlap: '0', startOffsetX: '0', startOffsetY: '0' }]);
        setActivePartId(nextId);
      }
    } catch (error) {
      console.error('Failed to load pipe bending planner project', error);
    }
  };

  const handleExportCsv = () => {
    const rows = [
      ['Bend #', `Leg (${unitLabel})`, 'Angle (deg)', 'Direction', 'Flip H', `Arc (${unitLabel})`],
      ...bendRows.map((bend) => ([
        bend.index,
        bend.legLength || '',
        bend.angle || '',
        bend.direction || '',
        bend.flipHorizontal ? 'Yes' : 'No',
        formatNumber(bend.arcLength)
      ]))
    ];
    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}-bend-table.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleHeaderMouseDown = (event) => {
    if (event.target.closest('button, input, select, textarea, a')) {
      return;
    }
    onDragStart?.(event);
  };

  const normalButtonBorder = '2px outset #c0c0c0';
  const pressedButtonBorder = '2px inset #c0c0c0';
  const handleButtonMouseDown = (event) => {
    if (event.currentTarget.disabled) {
      return;
    }
    event.currentTarget.style.border = pressedButtonBorder;
    event.currentTarget.style.background = '#c0c0c0';
  };

  const handleButtonMouseUp = (event) => {
    if (event.currentTarget.disabled) {
      return;
    }
    event.currentTarget.style.border = normalButtonBorder;
    event.currentTarget.style.background = '#d4d0c8';
  };

  const handleButtonMouseLeave = (event) => {
    if (event.currentTarget.disabled) {
      return;
    }
    event.currentTarget.style.border = normalButtonBorder;
    event.currentTarget.style.background = '#d4d0c8';
  };

  const fieldLabelStyle = {
    display: 'block',
    marginBottom: 4,
    fontSize: '8pt',
    fontWeight: 'normal',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const inputStyle = {
    width: '100%',
    padding: '4px 8px',
    fontFamily: "'MS Sans Serif', sans-serif",
    fontSize: '8pt',
    border: '2px inset #c0c0c0',
    background: '#ffffff'
  };

  const sectionDescriptionStyle = {
    fontSize: '8pt',
    marginBottom: 8
  };

  const sectionTitleStyle = {
    fontSize: '8pt',
    fontWeight: 'normal',
    marginBottom: 4
  };

  const buttonStyle = {
    height: 28,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#d4d0c8',
    border: normalButtonBorder,
    fontFamily: "'MS Sans Serif', sans-serif",
    fontSize: '8pt',
    fontWeight: 'normal',
    lineHeight: 1,
    cursor: 'pointer',
    padding: '0 8px',
    whiteSpace: 'nowrap'
  };

  const disabledButtonStyle = {
    background: '#c0c0c0',
    border: '2px solid #c0c0c0',
    color: '#808080',
    cursor: 'default'
  };

  const badgeStyle = {
    fontSize: '8pt',
    fontWeight: 'normal'
  };

  const gridStyle = {
    display: 'grid',
    gap: 8,
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
  };

  const tableColumns = '36px 1fr 1fr 1fr 1fr 48px';
  const layerOffset = 95;
  const baseLayerOffset = layerOffset;
  const previews = useMemo(() => {
    const followerValue = parseFloat(followerLength) || 0;
    return parts.reduce((acc, part, index) => {
      const rows = buildBendRows(part.bends || []);
      const shouldJoin = index > 0 && part.joinToPrevious;
      const previous = acc[acc.length - 1];
      const fallbackAngle = Number.isFinite(part.startAngle) ? part.startAngle : 0;
      const baseAngle = index === 0 ? 0 : fallbackAngle;
      const startAngleDegrees = shouldJoin && previous?.preview?.endAngle != null
        ? (previous.preview.endAngle * 180) / Math.PI
        : baseAngle;
      const preview = buildPreviewPath(
        rows,
        centerLineRadius,
        followerValue,
        true,
        startAngleDegrees
      );
      let offsetX = index * baseLayerOffset;
      let offsetY = 0;
      if (!shouldJoin) {
        offsetX = parseFloat(part.startOffsetX) || 0;
        offsetY = parseFloat(part.startOffsetY) || 0;
      } else if (previous?.preview && preview) {
        const overlap = parseFloat(part.joinOverlap) || 0;
        const prevScreenX = (-previous.preview.start.x + (previous.offsetX ?? 0)) + previous.preview.end.x;
        const prevScreenY = (-previous.preview.start.y + (previous.offsetY ?? 0)) + previous.preview.end.y;
        const prevAngle = previous.preview.endAngle ?? 0;
        const targetX = prevScreenX - (overlap * Math.cos(prevAngle));
        const targetY = prevScreenY - (overlap * Math.sin(prevAngle));
        offsetX = targetX;
        offsetY = targetY;
      }
      acc.push({
        id: part.id,
        rows,
        preview,
        joinToPrevious: part.joinToPrevious,
        offsetX,
        offsetY
      });
      return acc;
    }, []);
  }, [parts, centerLineRadius, followerLength, springback, pipeOd, wallThickness, kFactor, baseLayerOffset]);
  const activePreview = previews.find((item) => item.id === activePartId)?.preview || null;
  const previewStrokeWidth = Math.max(1, parseFloat(pipeOd) || 2);
  const previewLayerCount = Math.max(1, previews.length);
  const previewViewport = useMemo(() => {
    if (!previews.length) {
      return null;
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let anchorShiftX = 0;
    let anchorShiftY = 0;
    const firstWithPreview = previews.find((item) => item.preview);
    if (firstWithPreview?.preview) {
      const firstOffsetX = firstWithPreview.offsetX ?? 0;
      const firstOffsetY = firstWithPreview.offsetY ?? 0;
      anchorShiftX = -firstOffsetX;
      anchorShiftY = -firstOffsetY + 17;
    }
    previews.forEach((item, index) => {
      if (!item.preview) {
        return;
      }
      const offsetX = item.offsetX ?? (index * baseLayerOffset);
      const offsetY = item.offsetY ?? 0;
      const left = offsetX + (item.preview.rawBounds.minX - item.preview.start.x);
      const right = offsetX + (item.preview.rawBounds.maxX - item.preview.start.x);
      const top = offsetY + (item.preview.rawBounds.minY - item.preview.start.y);
      const bottom = offsetY + (item.preview.rawBounds.maxY - item.preview.start.y);
      minX = Math.min(minX, left);
      minY = Math.min(minY, top);
      maxX = Math.max(maxX, right);
      maxY = Math.max(maxY, bottom);
    });
    if (!Number.isFinite(minX) || !Number.isFinite(minY)) {
      return null;
    }
    const extraBottom = 24;
    return {
      width: Math.max(1, maxX - minX),
      height: Math.max(1, maxY - minY) + extraBottom,
      shiftX: anchorShiftX,
      shiftY: anchorShiftY
    };
  }, [previews, baseLayerOffset]);

  return (
    <div
      style={{
        position: 'absolute',
        top: position?.y ?? 140,
        left: position?.x ?? 120,
        width: '1120px',
        maxWidth: '96vw',
        height: '820px',
        maxHeight: '96vh',
        background: '#d4d0c8',
        borderTop: '2px solid #ffffff',
        borderLeft: '2px solid #ffffff',
        borderRight: '2px solid #808080',
        borderBottom: '2px solid #808080',
        overflow: 'hidden',
        zIndex,
        fontFamily: "'MS Sans Serif', sans-serif",
        fontSize: '8pt'
      }}
      onMouseDown={(event) => {
        event.stopPropagation();
        onBringToFront?.();
      }}
    >
      <Header
        title="Pipe"
        iconSrc="/Controls.ico"
        iconAlt="Pipe planner"
        onClose={onClose}
        onMinimize={() => {}}
        onDragStart={handleHeaderMouseDown}
      />

      <div
        role="menubar"
        aria-label="Pipe menu"
        onMouseLeave={() => setOpenMenu(null)}
        style={{
          position: 'relative',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          height: 24,
          padding: '0 8px',
          background: '#d4d0c8',
          fontFamily: "'MS Sans Serif', sans-serif",
          fontSize: '8pt'
        }}
      >
        {['File', 'Edit', 'View', 'Help'].map((label) => {
          const isOpen = openMenu === label;
          return (
            <button
              key={label}
              role="menuitem"
              type="button"
              onMouseDown={() => setOpenMenu(isOpen ? null : label)}
              style={{
                padding: '0 8px',
                height: 22,
                background: isOpen ? '#000080' : '#d4d0c8',
                border: isOpen ? '1px solid #000080' : '1px solid transparent',
                fontFamily: "'MS Sans Serif', sans-serif",
                fontSize: '8pt',
                lineHeight: '22px',
                cursor: 'default',
                color: isOpen ? '#ffffff' : '#000000'
              }}
              onMouseEnter={(event) => {
                if (!openMenu) {
                  event.currentTarget.style.border = '1px solid #000080';
                  event.currentTarget.style.background = '#000080';
                  event.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(event) => {
                if (!openMenu) {
                  event.currentTarget.style.border = '1px solid transparent';
                  event.currentTarget.style.background = '#d4d0c8';
                  event.currentTarget.style.color = '#000000';
                }
              }}
            >
              {label}
            </button>
          );
        })}
        {openMenu === 'File' && (
          <div
            role="menu"
            aria-label="File menu"
            style={{
              position: 'absolute',
              top: '100%',
              left: 4,
              minWidth: 150,
              background: '#d4d0c8',
              border: '2px outset #c0c0c0',
              padding: 2,
              zIndex: 5
            }}
          >
            {[
              { label: 'New Project', onClick: resetProject },
              { label: 'Open...', onClick: handleLoad },
              { label: 'Save', onClick: handleSave },
              { label: 'Save As...', onClick: handleSave },
              { label: 'Export CSV', onClick: handleExportCsv },
              { label: 'Print...', onClick: () => window.print() },
              { label: 'Exit', onClick: onClose }
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  item.onClick?.();
                  setOpenMenu(null);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '4px 16px 4px 8px',
                  background: '#d4d0c8',
                  border: '1px solid transparent',
                  fontFamily: "'MS Sans Serif', sans-serif",
                  fontSize: '8pt',
                  cursor: 'default'
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = '#000080';
                  event.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = '#d4d0c8';
                  event.currentTarget.style.color = '#000000';
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{ background: '#d4d0c8', padding: '0 8px 8px' }}>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
          <div style={{ paddingTop: 8 }}>
            <div style={{ padding: 0 }}>
              <div style={{ border: '2px inset #c0c0c0', background: '#ffffff', height: 380, position: 'relative' }}>
                {previewViewport ? (
                  <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${previewViewport.width} ${previewViewport.height}`}
                    preserveAspectRatio="xMinYMin meet"
                  >
                    <line
                      x1={previewViewport.width / 2}
                      y1="0"
                      x2={previewViewport.width / 2}
                      y2={previewViewport.height}
                      stroke="#000000"
                      strokeWidth="1"
                      strokeDasharray="1 2"
                    />
                    {previews.map((item, layerIndex) => {
                      if (!item.preview) {
                        return null;
                      }
                      const offsetX = item.offsetX ?? (layerIndex * baseLayerOffset);
                      const offsetY = item.offsetY ?? 0;
                      const opacity = layerIndex === 0 ? 1 : 0.55;
                      return (
                        <g
                          key={`layer-${item.id}`}
                          transform={`translate(${(-item.preview.start.x) + offsetX + (previewViewport.shiftX || 0)} ${(-item.preview.start.y) + offsetY + (previewViewport.shiftY || 0)})`}
                          opacity={opacity}
                        >
                          {layerIndex > 0 && !item.joinToPrevious && Number.isFinite(parseFloat(pipeOd)) && parseFloat(pipeOd) > 0 && (
                            (() => {
                              const radius = parseFloat(pipeOd) / 2;
                              const angle = item.preview.startAngle ?? 0;
                              const normalX = -Math.sin(angle);
                              const normalY = Math.cos(angle);
                              const x1 = item.preview.start.x + normalX * radius;
                              const y1 = item.preview.start.y + normalY * radius;
                              const x2 = item.preview.start.x - normalX * radius;
                              const y2 = item.preview.start.y - normalY * radius;
                              return (
                                <path
                                  d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
                                  fill="none"
                                  stroke="#000000"
                                  strokeWidth="1"
                                />
                              );
                            })()
                          )}
                          <path d={item.preview.legD} fill="none" stroke="#000000" strokeWidth={previewStrokeWidth} />
                          <path d={item.preview.followerD} fill="none" stroke="#ff8a00" strokeWidth={previewStrokeWidth} />
                          <path d={item.preview.arcD} fill="none" stroke="#0057ff" strokeWidth={previewStrokeWidth} />
                          {item.preview.legSegments.map((segment, index) => {
                            const midX = (segment.x1 + segment.x2) / 2;
                            const midY = (segment.y1 + segment.y2) / 2;
                            const dx = segment.x2 - segment.x1;
                            const dy = segment.y2 - segment.y1;
                            const angle = Math.atan2(dy, dx);
                            const normalX = -Math.sin(angle);
                            const normalY = Math.cos(angle);
                            const labelOffset = 40;
                            const labelX = midX + normalX * labelOffset;
                            const labelY = midY + normalY * labelOffset;
                            const rotation = angle * (180 / Math.PI);
                            return (
                              <g key={`${segment.x1}-${segment.y1}-${index}-${item.id}`}>
                                <text
                                  x={labelX}
                                  y={labelY}
                                  fontSize="18"
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  transform={`rotate(${rotation} ${labelX} ${labelY})`}
                                >
                                  {formatNumber(segment.length)} {unitLabel}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      );
                    })}
                  </svg>
                ) : (
                  <div style={{ fontSize: '8pt', padding: 8 }}>
                    Add at least one leg and angle to see the preview.
                  </div>
                )}
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ border: '2px inset #c0c0c0', background: '#ffffff', height: 120, position: 'relative' }}>
                {markStops.maxPos > 0 ? (
                  <svg width="100%" height="100%" viewBox="0 0 600 80" preserveAspectRatio="none">
                    {markStops.segments.map((segment, index) => {
                      if (segment.to <= segment.from || markStops.maxPos === 0) {
                        return null;
                      }
                      const x1 = 12 + ((segment.from / markStops.maxPos) * (588 - 12));
                      const x2 = 12 + ((segment.to / markStops.maxPos) * (588 - 12));
                      const midX = (x1 + x2) / 2;
                      return (
                        <g key={`segment-${index}`}>
                          <line
                            x1={x1}
                            y1="40"
                            x2={x2}
                            y2="40"
                            stroke={segment.color}
                            strokeWidth="2"
                          />
                          {segment.length > 0 && (
                            <text x={midX} y="64" fontSize={markLabelFontSize} textAnchor="middle" fill={segment.color}>
                              {formatNumber(segment.length)} {unitLabel}
                            </text>
                          )}
                        </g>
                      );
                    })}
                    {(() => {
                      let lastLabelX = -Infinity;
                      return markStops.marks.map((mark) => {
                        const x = 12 + ((mark.pos / markStops.maxPos) * (588 - 12));
                        const shouldShowLabel = x - lastLabelX >= 28;
                        if (shouldShowLabel) {
                          lastLabelX = x;
                        }
                        return (
                          <g key={`mark-${mark.label}`}>
                            <line x1={x} y1="30" x2={x} y2="50" stroke="#000000" strokeWidth="1" />
                            {shouldShowLabel && (
                              <text x={x} y="24" fontSize={markLabelFontSize} textAnchor="middle">
                                {mark.label}
                              </text>
                            )}
                          </g>
                        );
                      });
                    })()}
                  </svg>
                ) : (
                  <div style={{ fontSize: '8pt', padding: 8 }}>
                    Add bends to see mark positions.
                  </div>
                )}
              </div>
            </div>
            <div className="group-box" style={{ marginTop: 12 }}>
              <div className="group-box-label">Lengths</div>
              <div style={{ display: 'grid', gap: 4, rowGap: 4, columnGap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', fontSize: '8pt', marginTop: 8 }}>
                <div>Developed length: {formatNumber(totals.totalLength)} {unitLabel}</div>
                <div>
                  Total incl follower: {formatNumber(totals.totalLength + ((parseFloat(followerLength) || 0) * bendRows.length))} {unitLabel}
                </div>
                <div style={{ fontWeight: 'normal' }}>Cut length: {formatNumber(totals.cutLength)} {unitLabel}</div>
                <div>
                  Total horizontal width: {activePreview
                    ? formatNumber(activePreview.rawBounds.maxX - activePreview.rawBounds.minX)
                    : '--'} {unitLabel}
                </div>
                <div>
                  Total vertical height: {activePreview
                    ? formatNumber(activePreview.rawBounds.maxY - activePreview.rawBounds.minY)
                    : '--'} {unitLabel}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="group-box" style={{ marginTop: 8 }}>
              <div className="group-box-label">Requirements</div>
              <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginTop: 8 }}>
                <div>
                  <label style={fieldLabelStyle}>Height</label>
                  <input
                    style={inputStyle}
                    value={requiredHeight}
                    onChange={(event) => setRequiredHeight(event.target.value)}
                  />
                </div>
                <div>
                  <label style={fieldLabelStyle}>Length</label>
                  <input
                    style={inputStyle}
                    value={requiredLength}
                    onChange={(event) => setRequiredLength(event.target.value)}
                  />
                </div>
                <div>
                  <label style={fieldLabelStyle}>Pipe OD</label>
                  <select style={inputStyle} value={`${pipeOd}|${wallThickness}`} onChange={handlePipeOdChange}>
                    {pipeOdOptions.map((option) => (
                      <option key={option.id} value={`${option.od}|${option.wall}`}>
                        OD {option.od} · Wall {option.wall} · {option.grade} · {option.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: 8, fontSize: '8pt' }}>
                Estimated material cost: {pipeUnitCost
                  ? `$${formatNumber(totals.cutLength * pipeUnitCost)}`
                  : '--'}
              </div>
            </div>

            <div className="group-box" style={{ marginTop: 12 }}>
              <div className="group-box-label">Tooling</div>
              <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginTop: 8 }}>
                <div>
                  <label style={fieldLabelStyle}>CLR</label>
                  <input style={inputStyle} value={centerLineRadius} onChange={(event) => setCenterLineRadius(event.target.value)} />
                </div>
                <div>
                  <label style={fieldLabelStyle}>Min leg</label>
                  <input style={inputStyle} value={minLeg} onChange={(event) => setMinLeg(event.target.value)} />
                </div>
                <div>
                  <label style={fieldLabelStyle}>Follower length</label>
                  <input style={inputStyle} value={followerLength} onChange={(event) => setFollowerLength(event.target.value)} />
                </div>
                <div>
                  <label style={fieldLabelStyle}>K-factor</label>
                  <input style={inputStyle} value={kFactor} onChange={(event) => setKFactor(event.target.value)} />
                </div>
                <div>
                  <label style={fieldLabelStyle}>Springback (°)</label>
                  <input style={inputStyle} value={springback} onChange={(event) => setSpringback(event.target.value)} />
                </div>
              </div>
            </div>

            <div className="group-box" style={{ marginTop: 12 }}>
              <div className="group-box-label">Part</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, marginTop: 8 }}>
                <div style={{ flex: 1 }}>
                  <select
                    style={inputStyle}
                    value={activePart?.id || ''}
                    onChange={(event) => setActivePartId(event.target.value)}
                    aria-label="Select part"
                  >
                    {parts.map((part, index) => (
                      <option key={part.id} value={part.id}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginLeft: 'auto' }}>
                  <button
                    onClick={addPart}
                    aria-label="Add part"
                    title="Add part"
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                    onMouseLeave={handleButtonMouseLeave}
                    style={{
                      minWidth: 56,
                      ...buttonStyle
                    }}
                  >
                    Add part
                  </button>
                  <button
                    onClick={removePart}
                    aria-label="Remove part"
                    title="Remove part"
                    disabled={previewLayerCount === 1}
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                    onMouseLeave={handleButtonMouseLeave}
                    style={{
                      minWidth: 48,
                      ...buttonStyle,
                      ...(previewLayerCount === 1 ? disabledButtonStyle : null)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {activePartIndex > 0 && (
                <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginTop: 8 }}>
                  <div>
                    <label style={fieldLabelStyle}>Join to previous</label>
                    <select
                      style={inputStyle}
                      value={activePart?.joinToPrevious ? 'yes' : 'no'}
                      onChange={(event) => {
                        const nextJoin = event.target.value === 'yes';
                        setParts((prev) => prev.map((part) => (
                          part.id === activePartId ? { ...part, joinToPrevious: nextJoin } : part
                        )));
                      }}
                      aria-label="Join to previous"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label style={fieldLabelStyle}>Join type</label>
                    <select
                      style={inputStyle}
                      value={activePart?.joinType || 'Weld'}
                      onChange={(event) => {
                        const nextType = event.target.value;
                        setParts((prev) => prev.map((part) => (
                          part.id === activePartId ? { ...part, joinType: nextType } : part
                        )));
                      }}
                      aria-label="Join type"
                    >
                      <option value="Weld">Weld</option>
                    </select>
                  </div>
                  <div>
                    <label style={fieldLabelStyle}>Overlap</label>
                    <input
                      style={inputStyle}
                      value={activePart?.joinOverlap || '0'}
                      onChange={(event) => {
                        const nextValue = event.target.value;
                        setParts((prev) => prev.map((part) => (
                          part.id === activePartId ? { ...part, joinOverlap: nextValue } : part
                        )));
                      }}
                      aria-label="Overlap length"
                    />
                  </div>
                  {!activePart?.joinToPrevious && (
                    <>
                      <div>
                        <label style={fieldLabelStyle}>Start X</label>
                        <input
                          style={inputStyle}
                          value={activePart?.startOffsetX || '0'}
                          onChange={(event) => {
                            const nextValue = event.target.value;
                            setParts((prev) => prev.map((part) => (
                              part.id === activePartId ? { ...part, startOffsetX: nextValue } : part
                            )));
                          }}
                          aria-label="Start X"
                        />
                      </div>
                      <div>
                        <label style={fieldLabelStyle}>Start Y</label>
                        <input
                          style={inputStyle}
                          value={activePart?.startOffsetY || '0'}
                          onChange={(event) => {
                            const nextValue = event.target.value;
                            setParts((prev) => prev.map((part) => (
                              part.id === activePartId ? { ...part, startOffsetY: nextValue } : part
                            )));
                          }}
                          aria-label="Start Y"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              <div style={{ marginTop: 8, border: '2px inset #c0c0c0', padding: 8, background: '#d4d0c8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6, gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={fieldLabelStyle}>Start direction</label>
                    <select
                      style={{ ...inputStyle, width: 140 }}
                      value={String(activePart?.startAngle ?? 0)}
                      onChange={(event) => {
                        const nextAngle = parseFloat(event.target.value);
                        setParts((prev) => prev.map((part) => (
                          part.id === activePartId
                            ? { ...part, startAngle: Number.isFinite(nextAngle) ? nextAngle : 0 }
                            : part
                        )));
                      }}
                      aria-label="Start direction"
                    >
                      <option value="0">Right</option>
                      <option value="90">Down</option>
                      <option value="180">Left</option>
                      <option value="270">Up</option>
                    </select>
                    </div>
                    {isPrimaryPartComplete && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <label style={fieldLabelStyle}>Offcut</label>
                        <input
                          style={{ ...inputStyle, maxWidth: 120 }}
                          value={offcutLength}
                          onChange={(event) => setOffcutLength(event.target.value)}
                          aria-label="Offcut length"
                        />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={addBend}
                    aria-label="Add bend"
                    title="Add bend"
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                    onMouseLeave={handleButtonMouseLeave}
                    style={{
                      minWidth: 48,
                      ...buttonStyle
                    }}
                  >
                    Add bend
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: tableColumns, gap: 6, fontSize: '8pt', fontWeight: 'normal' }}>
                  <div>Bend</div>
                  <div>Leg</div>
                  <div>Angle</div>
                  <div>Dir</div>
                  <div>Arc</div>
                  <div>Action</div>
                </div>

                {bendRows.map((bend) => (
                  <div
                    key={bend.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: tableColumns,
                      gap: 6,
                      alignItems: 'center',
                      marginTop: 6,
                      padding: 6,
                      background: '#d4d0c8',
                      border: '2px inset #c0c0c0'
                    }}
                  >
                    <span style={badgeStyle}>{bend.index}</span>
                    <input
                      style={inputStyle}
                      value={bend.legLength}
                      onChange={(event) => updateBend(bend.id, 'legLength', event.target.value)}
                      aria-label={`Bend ${bend.index} leg length`}
                    />
                    <input
                      style={inputStyle}
                      value={bend.angle}
                      onChange={(event) => updateBend(bend.id, 'angle', event.target.value)}
                      aria-label={`Bend ${bend.index} angle`}
                    />
                    <select
                      style={inputStyle}
                      value={bend.direction || 'left'}
                      onChange={(event) => updateBend(bend.id, 'direction', event.target.value)}
                      aria-label={`Bend ${bend.index} direction`}
                    >
                      <option value="right">Right</option>
                      <option value="left">Left</option>
                    </select>
                    <div>
                      {formatNumber(bend.arcLength)} {unitLabel}
                    </div>
                    <button
                      onClick={() => removeBend(bend.id)}
                      aria-label={`Remove bend ${bend.index}`}
                      title="Remove bend"
                      onMouseDown={handleButtonMouseDown}
                      onMouseUp={handleButtonMouseUp}
                      onMouseLeave={handleButtonMouseLeave}
                      style={{
                        minWidth: 48,
                      ...buttonStyle
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PipeBendingPlanner;
