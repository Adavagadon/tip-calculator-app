import React, {useState, useEffect} from 'react';

const Header = () => {
  return <header>
    <img src="images/logo.svg" alt="logo"  className="logo"/>
  </header>
}

const Bill = ({handler, value}) => {
  return (
    <div>
      <label htmlFor="bill">Bill</label>
      <input className="bill-text" type="number" name="bill" id="bill" step="0.01" onChange={handler} value={value} placeholder="0.00" />
    </div>
  )
}

const PercentButton = ({id, value, handleButton, isActive}) => {
  return <button className={isActive ? 'active' : ''} onClick={() => handleButton(id)}>{`${value}%`}</button>
}

const Tip = ({buttons, handleButton, handleTip}) => {
  return (
    <div>
      <label htmlFor="tip">Select Tip %</label>
      <div className="grid">
        {buttons.map(button => {
          return <PercentButton key={button.id} {...button} handleButton={handleButton} />
        })}
        <input type="text" name="tip" id="tip" onChange={handleTip} placeholder="Custom"/>
      </div>
    </div>
  )
}

const People = ({handler, value, error}) => {
  return (
    <div>
      <div className="people__container">
        <label htmlFor="people">Number of People</label>
        {error ? <label className="error" htmlFor='people'>Can't be zero</label> : ''}
        
      </div>
      <input className={error ? "people-text error" : "people-text"} type="number" name="people" id="people" step="1" onChange={handler} value={value} placeholder="0" />
    </div>
  )
}

const Result = ({result, reset}) => {
  return (
    <div className="result">

      <div className="result__container">

        <div className="result__name">
          <p className="result__text result__text--main">Tip Amount</p>
          <p className="result__text result__text--secondary">/ person</p>
        </div>

        <div className="result__number">
          {result.tip}
        </div>

      </div>

      <div className="result__container">

        <div className="result__name">
          <p className="result__text result__text--main">Total</p>
          <p className="result__text result__text--secondary">/ person</p>
        </div>

        <div className="result__number">
          {result.total}
        </div>
        
      </div>

      <button onClick={reset}>RESET</button>

    </div>
  )
}

const Calculator = () => {
  const buttonList = [
    {id: 0, isActive: true, value: 5},
    {id: 1, isActive: false, value: 10},
    {id: 2, isActive: false, value: 15},
    {id: 3, isActive: false, value: 25},
    {id: 4, isActive: false, value: 50},
  ];
  const defaultValues = {bill: '', tip: 5, people: ''};
  const [values, setValues] = useState(defaultValues);
  const [buttons, setButtons] = useState(buttonList);
  const [result, setResult] = useState({tip: `$0.00`, total: `$0.00`});
  const [isError, setIsError] = useState(false);

  const handleButton = (id) => {
    const newList = buttons;
    newList.map(button => button.isActive = false);
    newList[id].isActive = true;
    setButtons(newList);
    setValues({...values, tip: newList[id].value});
  }

  const handleBill = e => {
    if(e.target.value){
      setValues({...values, bill: e.target.value * 1});
    } else {
      setValues({...values, bill: 0});
    }
  }

  const handleTip = e => {
    const newList = buttons;
    newList.map(button => button.isActive = false);
    if(!e.target.value) {
      newList[0].isActive = true;
      setValues({...values, tip: newList[0].value});
    } else {
      setValues({...values, tip: e.target.value});
    }
    setButtons(newList);
  }

  const handlePeople = e => {
    if(e.target.value){
      setValues({...values, people: e.target.value * 1});
    } else {
      setValues({...values, people: 0});
    }
  }

  const isThereAnError = () => {
    if(values.people == 0){
      setIsError(true);
    } else {
      setIsError(false);
    }
  }

  const countResult = () => {
    if(values.bill * 1 > 0 && values.people * 1 > 0) {
      const {bill, tip, people} = values;
      let r = bill * (tip / 100) / people;
      let r2 = (bill + r * people) / people;
      r = Math.round(r * 100) / 100;
      r2 = Math.round(r2 * 100) / 100;
      setResult({...result, tip: `$${r}`, total: `$${r2}`});
    } else {
      setResult({...result, tip: `$0.00`, total: `$0.00`});
    }
  }

  const reset = () => {
    setValues(defaultValues);
    setButtons(buttonList);
  }

  useEffect(() => {
    countResult();
    isThereAnError();
  }, [values, buttons]);

  return <main>
    <form onSubmit={e => e.preventDefault()}>
      <Bill handler={handleBill} value={values.bill}/>
      <Tip handleButton={handleButton} handleTip={handleTip} buttons={buttons}/>
      <People handler={handlePeople} value={values.people} error={isError}/>
      <Result result={result} reset={reset}/>
    </form>
  </main>
}

const App = () => {
  return (
    <>
      <Header />
      <Calculator />
    </>
  );
}

export default App;