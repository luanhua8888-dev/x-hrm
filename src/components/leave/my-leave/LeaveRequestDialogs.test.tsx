import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { LeaveRequestDialog } from '@/components/leave/my-leave/LeaveRequestDialogs';

describe('LeaveRequestDialog', () => {
  it('shows document guidance and a required attachment for social-insurance leave', () => {
    render(<LeaveRequestDialog open onClose={vi.fn()} onCreate={vi.fn()} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'sick' } });

    expect(screen.getByText('Cần chứng từ y tế để HR xử lý chế độ.')).toBeInTheDocument();
    expect(screen.getByLabelText('Chứng từ')).toBeRequired();
  });
});
