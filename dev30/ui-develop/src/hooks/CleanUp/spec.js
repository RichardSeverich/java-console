import { renderHook } from '@testing-library/react-hooks';
import useCleanUp from './index';

describe('clean up hook tests', () => {
  it('should calls the mockCallback function after the component is unmout', () => {
    expect.assertions(1);
    const mockCallback = jest.fn();
    mockCallback.mockReturnValue('Cleaned');
    const { unmount } = renderHook(() => useCleanUp(mockCallback));
    unmount();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
