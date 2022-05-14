const roleDictionary: Record<string, string> = {
    std: 'นักศึกษา',
    prof: 'อาจารย์',
    ofc: 'ธุรการ'
}

export function mapRoleTitle(role: string) {
    return roleDictionary[role] ? roleDictionary[role] : '—'
}