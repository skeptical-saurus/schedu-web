const roleDictionary: Record<string, string> = {
  'std': 'นักศึกษา',
  'prof/ofc': 'อาจารย์/ธุรการ',
}

const statusDictionary: Record<string, string> = {
  pending: 'รอการยืนยัน',
  ongoing: 'กำลังดำเนินการ',
  abandoned: 'ถูกปฏิเสธ',
  done: 'เสร็จสิ้น',
}

const commMethodDictionary: Record<string, string> = {
  F2F: 'Face-to-Face',
  TEL: 'โทรศัพท์',
  GM: 'Google Meet',
  ZM: 'Zoom Meeting',
  MT: 'Microsoft Teams',
}

export const mapRoleTitle = (role: string | undefined) => {
  return role && roleDictionary[role] ? roleDictionary[role] : '—'
}

export const mapStatus = (status: string) => {
  return statusDictionary[status]
}

export const commMethodStatus = (method: string) => {
  return commMethodDictionary[method]
}
