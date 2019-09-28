import FileSaver from 'file-saver'

import { STORAGE } from '../constants'
import ENDPOINTS from '../api'

const downloadFeedback = () => {
  const token = localStorage.getItem(STORAGE.TOKEN)
  return fetch(ENDPOINTS.DOWNLOAD_FEEDBACK, {
    headers: { authorization: `Bearer ${token}` },
  })
    .then(res => res.blob())
    .then(blob => FileSaver.saveAs(blob, 'feedback.csv'))
}

export default downloadFeedback
