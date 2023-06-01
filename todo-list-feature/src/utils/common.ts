export const DueStatus: { [key: number]: string } = {
  0: 'Chưa hoàn thành',
  1: 'Đã hoàn thành',
  2: 'Đã hết hạn'
}

export const checkStatus = (dueDate: string, status: number) => {
  if (new Date(dueDate).getTime() > new Date().getTime()) {
    console.log('hello')

    if (status === 0) {
      return 'text-red-400'
    }
    return 'text-green-400'
  }
  return 'text-gray-400'
}
