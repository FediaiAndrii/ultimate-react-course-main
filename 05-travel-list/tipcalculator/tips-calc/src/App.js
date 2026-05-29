import { useState } from "react";

const rateVariables = [
  { text: "Dissatisfied (0%)", percentage: 0 },
  { text: "It was okay (5%)", percentage: 0.05 },
  { text: "It was good (10%)", percentage: 0.1 },
  { text: "Absolutely amazing! (20%)", percentage: 0.2 },
];

export default function App() {
  const [bill, setBill] = useState(0);
  const [myTipRate, setMyTipRate] = useState(0);
  const [friendTipRate, setFriendTipRate] = useState(0);

  function handleReset() {
    setBill(0);
    setMyTipRate(0);
    setFriendTipRate(0);
  }

  return (
    <div className="App">
      <Bill bill={bill} onBill={setBill} />
      <Rate percentage={myTipRate} onSelect={setMyTipRate}>
        <span>How did you like the service?</span>
      </Rate>
      <Rate percentage={friendTipRate} onSelect={setFriendTipRate}>
        <span>How did your friend like the service?</span>
      </Rate>
      <FinalBill
        bill={bill}
        myTipRate={myTipRate}
        friendTipRate={friendTipRate}
      />
      <Reset bill={bill} onReset={handleReset} />
    </div>
  );
}

function Bill({ onBill, bill }) {
  return (
    <form>
      <span>How much was the bill?</span>
      <input
        type="text"
        value={bill}
        onChange={e =>
          onBill(e.target.value === "" ? "" : Number(e.target.value))
        }
      ></input>
    </form>
  );
}
function Rate({ children, percentage, onSelect }) {
  return (
    <form>
      {children}
      <select
        value={percentage}
        onChange={e => onSelect(Number(e.target.value))}
      >
        {rateVariables.map(variable => (
          <option value={variable.percentage} key={variable.text}>
            {variable.text}
          </option>
        ))}
      </select>
    </form>
  );
}
function FinalBill({ bill, myTipRate, friendTipRate }) {
  if (!bill || bill <= 0) return null;
  const averageTipRate = (myTipRate + friendTipRate) / 2;

  const tip = Math.round(bill * averageTipRate);

  const total = bill + tip;

  return (
    <h2>
      You pay ${total} (${bill} + ${tip} tip)
    </h2>
  );
}
function Reset({ bill, onReset }) {
  if (!bill || bill <= 0) return null;
  return <button onClick={onReset}>RESET</button>;
}
