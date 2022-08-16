import { useEffect, useRef, forwardRef } from 'react';

const _Kidding = (props, ref) => {
  // https://numb86-tech.hatenablog.com/entry/2019/12/06/122217

  useEffect(() => {
    console.log('_props, ref', props, ref);
    const { a, b } = { ...props.props };
    console.log('a,b', a, b);
  }, []);
  const styles = {
    backgroundColor: 'yellow',
  };
  return (
    <div ref={ref}>
      <h2 style={styles}>Kidding</h2>
      {props.children}
    </div>
  );
};

const Kidding = forwardRef(_Kidding);

export default Kidding;
