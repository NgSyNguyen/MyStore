import '@assets/styles/ui/button.css';
// eslint-disable-next-line react/prop-types
function Button({ onClick, children, type = 'button', className = 'btn', to }) {
  return (
    <button to={to} type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
