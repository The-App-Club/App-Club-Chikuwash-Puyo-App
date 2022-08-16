import Pudding from './components/Pudding';
import Kidding from './components/Kidding';
import NoKidding from './components/NoKidding';
import { CSSTransition } from 'react-transition-group';
import { useEffect, useState, useRef } from 'react';

function App() {
  const ref = useRef();
  const nodeRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  const handleClick = (e) => {
    setIsShow(!isShow);
    console.log(e);
  };

  return (
    <div>
      {/* http://reactcommunity.org/react-transition-group/css-transition */}
      {/* https://github.com/reactjs/react-transition-group/issues/668#issuecomment-695162879 */}
      <CSSTransition nodeRef={nodeRef} in={isShow} timeout={2000} classNames="my-node" unmountOnExit>
        {/* Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? */}
        {/* これがだめ */}
        {/* <NoKidding ref={ref} /> */}

        {/* これがただしい */}
        <Kidding ref={nodeRef} props={{ a: 'apple', b: 'banana' }} />
      </CSSTransition>
      <br />
      <button
        type="button"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        focus
      </button>
    </div>
  );
}

export default App;
