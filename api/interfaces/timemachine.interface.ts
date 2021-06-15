

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Current {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<Weather>;
}

export interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<Weather>;
    wind_gust?: number;
}

export interface TimemachineResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    hourly: Array<Hourly>;
}

