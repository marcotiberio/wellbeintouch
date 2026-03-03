export function useReportModal() {
  const isOpen = useState('reportModal', () => false)

  function open() {
    if (import.meta.client) {
      window.open('https://forms.gle/QjPy7BhVgdFCPT5K7', '_blank')
    }
  }

  function close() {
    isOpen.value = false
    if (import.meta.client) {
      document.body.classList.remove('modal-open')
    }
  }

  return { isOpen, open, close }
}
