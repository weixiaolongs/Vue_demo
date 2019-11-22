import request from './request'

// npm run serve : process.env.NODE_ENV === 'development' /// npm run build: process.env.NODE_ENV === 'production'
// console.log()
const preUrl = process.env.NODE_ENV === 'development' ? '/api' : ''

export const LoginApi = (data) => request.post(preUrl + '/tokens', data)
// 获取部门列表
export const getDepartments = (data) => request.get(preUrl + '/departments', { params: data })
// 添加部门
export const addDepartments = (data) => request.post(preUrl + '/departments', data)
// 编辑部门/departments/{id}
export const editDepartments = (data) => request.put(preUrl + '/departments/' + data.id, data)
// 删除部门/departments/{id}
export const delDepartments = (data) => request.delete(preUrl + '/departments/' + data.id, { params: data })
// 获取员工列表数据
export const getEmployees = (data) => request.get(preUrl + '/employees', { params: data })
// 导出excel表格
export const exportExcelUrl = preUrl + '/employees/xlses'
// 获取角色列表数据/roles
export const getRoles = (data) => request.get(preUrl + '/roles', { params: data })
// 添加员工信息
export const addEmployee = (data) => request.post(preUrl + '/employees', data)
// 获取单个员工信息
export const getEmployee = (data) => request.get(preUrl + '/employees/' + data.id, { params: data })
// 更新单个员工信息
export const updateEmployee = (data) => request.put(preUrl + '/employees/' + data.id, data)
// 删除多个员工信息
export const delEmployees = (data) => request.delete(preUrl + '/employees', { params: data })