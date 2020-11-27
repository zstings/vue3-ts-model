import http from '../utils/http'
function getWeather (params: any) {
  return http.get('Weather/get_weather', params)
}
export { getWeather }
