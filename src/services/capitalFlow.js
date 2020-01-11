import http from '../utils/request';
import api from '../api/index';
import dayjs from 'dayjs';
import { getWeek } from '../utils/date';


// 类型
export async function serviceGetCapitalFlowType() {
  let res = await http.get(api.capitalFlowType);
  res = res.map(item => {
    item.text = (item.type === 1 ? '收入 - ' : '支出 - ') + item.name;
    item.value = item.id;
    return item;
  }).sort((a, b) => a.type - b.type);

  return res;
}

export function serviceDeleteCapitalFlowType(id) {
  return http.delete(`${api.capitalFlowType}/${id}`, { successAlert: true });
}

export function serviceUpdateCapitalFlowType(id, data) {
  return http.put(`${api.capitalFlowType}/${id}`, data, { successAlert: true });
}

export function serviceCreateCapitalFlowType(data) {
  return http.post(api.capitalFlowType, data, { successAlert: true });
}


// 流动资金
export async function serviceGetCapitalFlow(params) {
  const result = await http.get(api.capitalFlow, params);
  result.rows = result.rows.map(item => {
    item.__date__ = dayjs(item.date).format('YYYY-MM-DD HH:mm');
    item.__week__ = getWeek(item.createdAt);
    item.__statusText__ = item.type === 1 ? '收入' : '支出';
    item.__tagType__ = item.type === 1 ? 'primary' : 'danger';
    item.__symbol__ = item.type === 1 ? '+' : '-';
    item.__priceColor__ == item.type === 1 ? '#ffa500' : '#000';
    return item;
  });
  return result;
}

export function serviceDeleteCapitalFlow(id) {
  return http.del(`${api.capitalFlow}/${id}`, {
    isLoading: true,
    loadingText: '删除中...'
  });
}

export function serviceUpdateCapitalFlow(id, data) {
  return http.put(`${api.capitalFlow}/${id}`, data);
}

export function serviceCreateCapitalFlow(data) {
  return http.post(api.capitalFlow, data);
}

export function serviceGetCapitalFlowPrice(data) {
  return http.get(api.getCapitalFlowPrice, data);
}