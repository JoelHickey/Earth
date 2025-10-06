import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header title="Test Window" />)
    expect(document.body).toBeTruthy()
  })

  it('renders close and minimize buttons', () => {
    render(<Header title="Test Window" />)
    expect(screen.getByTitle('Close')).toBeInTheDocument()
    expect(screen.getByTitle('Minimize')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn()
    render(<Header title="Test Window" onClose={mockOnClose} />)
    
    fireEvent.click(screen.getByTitle('Close'))
    expect(mockOnClose).toHaveBeenCalledOnce()
  })

  it('calls onMinimize when minimize button is clicked', () => {
    const mockOnMinimize = vi.fn()
    render(<Header title="Test Window" onMinimize={mockOnMinimize} />)
    
    fireEvent.click(screen.getByTitle('Minimize'))
    expect(mockOnMinimize).toHaveBeenCalledOnce()
  })
})
