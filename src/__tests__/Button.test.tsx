import { render } from '@testing-library/react'
import { Button } from '../components/ui/button'

describe('Button', () => {
  it('renders children', () => {
    const { getByText } = render(<Button>Click</Button>)
    expect(getByText('Click')).toBeInTheDocument()
  })
})
