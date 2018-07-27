//Login Form
import React from 'react';

const LoginForm = ({horizontal, onChange, onSubmit, onFocus, header}) => {
  const formClass = (horizontal) ? 'signin-form' : '';
  const containerClass = (horizontal) ? 'form-row' : 'form-column';
  const colClass = (horizontal) ? 'col' : 'alt-col';

  //Show title if available
  function renderTitle() {
    if (header) {
      return <h6>{header}</h6>;
    }
  }

  return (
    <form className={formClass} onSubmit={onSubmit}>
      {renderTitle()}
      <div className={containerClass}>
        <div className={colClass}>
          <input
            type="text"
            name='email'
            className="form-control form-control-sm"
            placeholder="Email"
            onChange={onChange}
            onFocus={onFocus}/>
        </div>
        <div className={colClass}>
          <input
            type="password"
            name='password'
            className="form-control form-control-sm"
            placeholder="Password"
            onChange={onChange}
            onFocus={onFocus}/>
        </div>
        <button type='submit' className='btn btn-sm std-button'>Sign in</button>
      </div>
    </form>
  );
}

export default LoginForm;
