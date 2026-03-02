export function useReportModal() {
  const isOpen = useState('reportModal', () => false)

  function open() {
    isOpen.value = true
    if (import.meta.client) {
      document.body.classList.add('modal-open')
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
