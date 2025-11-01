import { cn, formatDate, calculatePercentage, getInitials } from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
      expect(cn('foo', { bar: true, baz: false })).toBe('foo bar')
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-11-01')
      const formatted = formatDate(date)
      expect(formatted).toContain('2024')
    })
  })

  describe('calculatePercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50)
      expect(calculatePercentage(1, 3)).toBe(33)
      expect(calculatePercentage(0, 100)).toBe(0)
      expect(calculatePercentage(0, 0)).toBe(0)
    })
  })

  describe('getInitials', () => {
    it('should get initials from name', () => {
      expect(getInitials('John Doe')).toBe('JD')
      expect(getInitials('Jane Smith')).toBe('JS')
      expect(getInitials('A')).toBe('A')
    })
  })
})
