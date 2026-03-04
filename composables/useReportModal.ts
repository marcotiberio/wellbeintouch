export function useReportModal() {
  function open() {
    if (import.meta.client && (window as any).Tally) {
      ;(window as any).Tally.openPopup('QKAqD1', {
        layout: 'modal',
        width: 800,
        emoji: { text: '👻', animation: 'none' },
        autoClose: 2000,
      })
    }
  }

  return { open }
}
