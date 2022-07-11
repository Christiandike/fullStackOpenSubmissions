import { useState } from "react";

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleGood = () => {
    setClicks({ ...clicks, good: clicks.good + 1 });
  };

  const handleNeutral = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1 });
  };

  const handleBad = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1 });
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <div>
        <Button onClick={handleGood} text="Good" />
        <Button onClick={handleNeutral} text="Neutral" />
        <Button onClick={handleBad} text="Bad" />
      </div>
      <Statistics clicks={clicks} />
    </div>
  );
};

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ clicks }) => {
  const { good, neutral, bad } = clicks;
  const all = good + bad + neutral;

  //truncates @average and @positive to two decimal places	
  const average = ((good - bad) / all).toFixed(2);

  const positive = ((good / all) * 100).toFixed(2) + "%";

  if (good === 0 && bad === 0 && neutral === 0) {
    return (
      <div>
        <h2> Statistics </h2>
        <p> No feedback given </p>
      </div>
    );
  }

  return (
    <div>
      <h2> Statistics </h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={all} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

export default App;
