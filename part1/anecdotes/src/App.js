import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(7).fill(0));

  const handleClick = () => {
    let randNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNum);
  };

  const handleVote = (index) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <div>
        <Button onClick={() => handleVote(selected)} text="vote" />
        <Button onClick={handleClick} text="next anecdote" />
      </div>
      <Display anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Display = ({ anecdotes, votes }) => {
  //finds index of anecdote with highest votes
  let max = Math.max(...votes);
  let index = votes.indexOf(Math.max(...votes));
  if (max === 0) {
    return (
      <div>
        <h2>Anecdote with most votes</h2>
        <p>You have not for voted any anecdote </p>
      </div>
    );
  }

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
      <p>Has {votes[index]} votes</p>
    </div>
  );
};

export default App;
