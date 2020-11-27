import React from 'react';

function Header() {

  return (
    <div class="header">
        <div class="bounds">
          <h1 class="header--logo">Courses</h1>
          <nav><span>Welcome Joe Smith!</span><a class="signout" href="index.html">Sign Out</a></nav>
        </div>
    </div>
  );
}

export default Header;