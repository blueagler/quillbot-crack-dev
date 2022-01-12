import { dialog } from '../utils';
import { message } from '../message';

export default async function () {

  const isLogin = JSON.parse(document.getElementById('__NEXT_DATA__').innerText).props.initialState.user.isAuthenticated;
  const isLoginPage = window.location.pathname === '/login';
  if (!isLogin && !isLoginPage) {
    dialog({
      content: message.loginGuide.content,
      actions: [
        {
          label: message.loginGuide.no,
          onClick: () => { },
        },
        {
          label: message.loginGuide.yes,
          onClick: () => window.location.href = `/login?returnUrl=${window.location.pathname}`,
        }
      ]
    })
  }

}