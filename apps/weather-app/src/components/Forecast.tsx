import "./Forecast.scss";

export const Forecast = () => {
  return (
    <article className="forecast">
      <article className="forecast-item">
        <h2 className="forecast-item__day">Tomorrow</h2>
        <img src="/sleet.png" alt="sleet" className="forecast-item__icon" />
        <footer className="forecast-item__degrees">
          <span>16 ℃</span>
          <span>11 ℃</span>
        </footer>
      </article>
      <article className="forecast-item">
        <h2 className="forecast-item__day">Sun, 7 Jun</h2>
        <img src="/snow.png" alt="snow" className="forecast-item__icon" />
        <footer className="forecast-item__degrees">
          <span>16 ℃</span>
          <span>11 ℃</span>
        </footer>
      </article>
      <article className="forecast-item">
        <h2 className="forecast-item__day">Mon, 8 Jun</h2>
        <img
          src="/thunderstorm.png"
          alt="thunderstorm"
          className="forecast-item__icon"
        />
        <footer className="forecast-item__degrees">
          <span>16 ℃</span>
          <span>11 ℃</span>
        </footer>
      </article>
      <article className="forecast-item">
        <h2 className="forecast-item__day">Tue, 9 Jun</h2>
        <img
          src="/light-cloud.png"
          alt="light-cloud"
          className="forecast-item__icon"
        />
        <footer className="forecast-item__degrees">
          <span>16 ℃</span>
          <span>11 ℃</span>
        </footer>
      </article>
      <article className="forecast-item">
        <h2 className="forecast-item__day">Wed, 10 Jun</h2>
        <img
          src="/heavy-rain.png"
          alt="heavy-rain"
          className="forecast-item__icon"
        />
        <footer className="forecast-item__degrees">
          <span>16 ℃</span>
          <span>11 ℃</span>
        </footer>
      </article>
    </article>
  );
};
