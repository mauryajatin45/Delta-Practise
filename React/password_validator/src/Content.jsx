import { useState } from "react";

export default function Content() {
  const [identifier, setIdentifier] = useState(false);
  const [conditions, setConditions] = useState({
    hasLower: false,
    hasUpper: false,
    hasSpecial: false,
    hasLength: false,
  });

  const check = (props) => {
    const currVal = props.target.value;
    const smallValidChars = "abcdefghijklmnopqrstuvwxyz";
    const capitalValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialValidChars = "!@#$%^&*()_+[]{}|;:,.<>?/~`";

    let newConditions = {
      hasLower: false,
      hasUpper: false,
      hasSpecial: false,
      hasLength: false,
    };

    for (let i = 0; i < currVal.length; i++) {
      let char = currVal[i];

      if (smallValidChars.includes(char)) newConditions.hasLower = true;
      if (capitalValidChars.includes(char)) newConditions.hasUpper = true;
      if (specialValidChars.includes(char)) newConditions.hasSpecial = true;
      if (currVal.length >= 12) newConditions.hasLength = true;
    }

    setConditions(newConditions);
    setIdentifier(newConditions.hasLower && newConditions.hasUpper && newConditions.hasSpecial && newConditions.hasLength);
  };

  return (
    <div className="contentDiv">
      <div className="contentHeader">
        <label htmlFor="pass">Enter a Password</label>
        <input type="text" onChange={check} />
        <p>Your password is {identifier ? "Strong" : "Weak"}</p>

        <div className="contentConditions">
          <ConditionFeedback condition={conditions.hasLength} text="12 characters" />
          <ConditionFeedback condition={conditions.hasUpper} text="UpperCase" />
          <ConditionFeedback condition={conditions.hasLower} text="LowerCase" />
          <ConditionFeedback condition={conditions.hasSpecial} text="Special Symbol" />
        </div>
      </div>
    </div>
  );
}

function ConditionFeedback({ condition, text }) {
  return (
    <div className={`condition ${condition ? "valid" : "invalid"}`}>
      {condition ? "✅" : "❌"} {text}
    </div>
  );
}
