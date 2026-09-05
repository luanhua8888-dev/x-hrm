import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import LogoutConfirmationDialog from '@/components/layout/LogoutConfirmationDialog';

describe('LogoutConfirmationDialog', () => {
  it('keeps the session active when the user cancels', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();

    render(<LogoutConfirmationDialog open onClose={onClose} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }));

    expect(onClose).toHaveBeenCalledOnce();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('only logs out after explicit confirmation', () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();

    render(<LogoutConfirmationDialog open onClose={onClose} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: 'Đăng xuất' }));

    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
