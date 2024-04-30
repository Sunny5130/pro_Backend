import { Component, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  imports: [HttpClientModule]
})

export class WeatherComponent {
  constructor(private titleService: Title, private el: ElementRef, private http: HttpClient) {
    this.titleService.setTitle("Weather Forcasting");
  }

  city: String = "Delhi";
  async onSub(ev: Event) {
    function formatTime(date: Date): string {
      const hours: number = date.getHours();
      const minutes: string = ('0' + date.getMinutes()).slice(-2);
      const seconds: string = ('0' + date.getSeconds()).slice(-2);
      return hours + ':' + minutes + ':' + seconds;
    }
    ev.preventDefault();
    this.city = (document.getElementById('searchCity') as HTMLInputElement).value;
    if (!this.city) {
      console.error("City cannot be empty");
      return;
    }
    try {
      const response = this.http.post("https://pro-backend-95b4.onrender.com/weather", {
        city: this.city
      }, { withCredentials: true }).subscribe((res: any) => {
        console.log(res);
        const resultObj = res.result;
        const cloud_pct = resultObj.cloud_pct;
        const temp = resultObj.temp;
        const feels_like = resultObj.feels_like;
        const humidity = resultObj.humidity;
        const min_temp = resultObj.min_temp;
        const max_temp = resultObj.max_temp;
        const wind_speed = resultObj.wind_speed;
        const wind_degrees = resultObj.wind_degrees;
        const sunriseTimestamp: number = resultObj.sunrise;
        const sunsetTimestamp: number = resultObj.sunset;
        const sunriseDate: Date = new Date(sunriseTimestamp * 1000);
        const sunsetDate: Date = new Date(sunsetTimestamp * 1000);
        const sunrise: string = formatTime(sunriseDate);
        const sunset: string = formatTime(sunsetDate);
        const temp_temp2 = document.getElementById("Temp_temp2");
        if (temp_temp2) {
          temp_temp2.textContent = temp;
        }
        const temp_temp = document.getElementById("Temp_temp");
        if (temp_temp) {
          temp_temp.textContent = temp;
        }
        const temp_min = document.getElementById("Temp_minTemp");
        if (temp_min) {
          temp_min.textContent = min_temp;
        }
        const temp_max = document.getElementById("Temp_maxTemp");
        if (temp_max) {
          temp_max.textContent = max_temp;
        }
        const hi_hu2 = document.getElementById("hi_hu2");
        if (hi_hu2) {
          hi_hu2.textContent = humidity;
        }
        const hi_hu = document.getElementById("hi_hu");
        if (hi_hu) {
          hi_hu.textContent = humidity;
        }
        const hi_cld = document.getElementById("hi_cld");
        if (hi_cld) {
          hi_cld.textContent = cloud_pct;
        }
        const hi_fl = document.getElementById("hi_fl");
        if (hi_fl) {
          hi_fl.textContent = feels_like;
        }
        const wi_ws2 = document.getElementById("wi_ws2");
        if (wi_ws2) {
          wi_ws2.textContent = wind_speed;
        }
        const wi_ws = document.getElementById("wi_ws");
        if (wi_ws) {
          wi_ws.textContent = wind_speed;
        }
        const wi_wd = document.getElementById("wi_wd");
        if (wi_wd) {
          wi_wd.textContent = wind_degrees;
        }
        const wi_srt = document.getElementById("wi_srt");
        if (wi_srt) {
          wi_srt.textContent = sunrise;
        }
        const wi_sst = document.getElementById("wi_sst");
        if (wi_sst) {
          wi_sst.textContent = sunset;
        }
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  async login(ev: Event) {
    ev.preventDefault();
    const res = this.http.post('https://pro-backend-95b4.onrender.com/login', {
      userName: this.el.nativeElement.querySelectorAll('#login-username')[0].value,
      password: this.el.nativeElement.querySelectorAll('#login-password')[0].value,
    }, { withCredentials: true }).subscribe((res: any) => {
      window.localStorage.setItem("token", res.token);
      console.log(res);
      if (res.token) {
        (document.querySelectorAll('.hero')[0] as HTMLElement).style.display = 'block';
        (document.querySelectorAll('.user')[0] as HTMLElement).style.display = 'none';
      }
    });
    console.log(res);
  }
  signUp(ev: Event) {
    ev.preventDefault();
    const password = this.el.nativeElement.querySelectorAll('#signup-password')[0].value;
    const confirmPassword = this.el.nativeElement.querySelectorAll('#signup-confirm-password')[0].value;
    if (password !== confirmPassword) {
      alert('Password not match');
      return;
    }
    this.http.post('https://pro-backend-95b4.onrender.com/register', {
      userName: this.el.nativeElement.querySelectorAll('#signup-username')[0].value,
      password: password,
    }, { withCredentials: true }).subscribe((res: any) => {
      if (res.token) {
        (document.querySelectorAll('.hero')[0] as HTMLElement).style.display = 'block';
        (document.querySelectorAll('.user')[0] as HTMLElement).style.display = 'none';
      }
    });
  }
  ngOnInit(): void {
    function formatTime(date: Date): string {
      const hours: number = date.getHours();
      const minutes: string = ('0' + date.getMinutes()).slice(-2);
      const seconds: string = ('0' + date.getSeconds()).slice(-2);
      return hours + ':' + minutes + ':' + seconds;
    }
    let cities: Array<HTMLCollection> = [...this.el.nativeElement.querySelectorAll("#cityName")];
    cities.forEach(async (city: any) => {
      const options = {
        headers: {
          'X-RapidAPI-Key': '5489631fd6mshf485e151fc22a89p1d0956jsn965800003331',
		      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
      };
      try {
        this.http.get(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city.textContent}`, options)
          .subscribe(async (response: any) => {
            const resultObj = response;
            city.parentElement.children[1].textContent = resultObj.cloud_pct;
            city.parentElement.children[2].textContent = resultObj.temp;
            city.parentElement.children[3].textContent = resultObj.feels_like;
            city.parentElement.children[4].textContent = resultObj.humidity;
            city.parentElement.children[5].textContent = resultObj.min_temp;
            city.parentElement.children[6].textContent = resultObj.max_temp;
            city.parentElement.children[7].textContent = resultObj.wind_speed;
            city.parentElement.children[8].textContent = resultObj.wind_degrees;
            const sunriseTimestamp: number = resultObj.sunrise;
            const sunsetTimestamp: number = resultObj.sunset;
            const sunriseDate: Date = new Date(sunriseTimestamp * 1000);
            const sunsetDate: Date = new Date(sunsetTimestamp * 1000);
            const sunrise: string = formatTime(sunriseDate);
            const sunset: string = formatTime(sunsetDate);
            city.parentElement.children[9].textContent = sunrise;
            city.parentElement.children[10].textContent = sunset;
          });
      } catch (error) {
        console.error(error);
      }
    });
    const signupButton = this.el.nativeElement.querySelectorAll('#signup-button')[0],
      loginButton = this.el.nativeElement.querySelectorAll('#login-button')[0],
      userForms = this.el.nativeElement.querySelectorAll('#user_options-forms')[0];

    signupButton?.addEventListener('click', () => {
      userForms?.classList.remove('bounceRight')
      userForms?.classList.add('bounceLeft')
    }, false)

    loginButton?.addEventListener('click', () => {
      userForms?.classList.remove('bounceLeft')
      userForms?.classList.add('bounceRight')
    }, false)
  }
}
@NgModule({
  imports: [HttpClientModule, WeatherComponent],
  providers: [provideHttpClient(withFetch())],
})
export class WeatherModule { }