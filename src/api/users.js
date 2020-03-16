import service from "@/utils/request";

export function GetRoles (data = {}) {
  return service.request({
    method: "post",
    url: "/role/",
    data
  })
}