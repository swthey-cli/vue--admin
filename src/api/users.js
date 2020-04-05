import service from "@/utils/request";

export function GetRoles (data = {}) {
  return service.request({
    method: "post",
    url: "/role/",
    data
  })
}
export function AddUser (data) {
  return service.request({
    method: "post",
    url: "/user/add/",
    data
  })
}
export function EditUser (data) {
  return service.request({
    method: "post",
    url: "/user/edit/",
    data
  })
}
export function DeleteUser (data) {
  return service.request({
    method: "post",
    url: "/user/delete/",
    data
  })
}

export function ActivesStatus (data) {
  return service.request({
    method: "post",
    url: "/user/actives/",
    data
  })
}