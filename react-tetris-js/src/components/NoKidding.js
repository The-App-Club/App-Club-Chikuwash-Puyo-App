const NoKidding = (props) => {
  // https://numb86-tech.hatenablog.com/entry/2019/12/06/122217
  const styles = {
    backgroundColor: 'yellow',
  };
  return (
    <div>
      <h2 style={styles}>NoKidding</h2>
      {props.children}
    </div>
  );
};

export default NoKidding;
