export interface WeatherResponse {
  users: User[];
}

export interface User {
  userId: number;
  name: string;
  farms: Farm[];
}

export interface Farm {
  farmId: number;
  name: string;
  lands: Land[];
}

export interface Land {
  landId: number;
  name: string;
  weather: WeatherData;
  centerX: number;
  centerY: number;
}

export interface WeatherData {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    precipitation: number;
    cloud_cover: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    is_day: number[];
    cloud_cover: number[];
  };
  daily: {
    time: string[];
    precipitation_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  }
}
