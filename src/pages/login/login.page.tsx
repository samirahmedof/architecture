import { PATHS } from '@app/router/paths.router.ts';
import { cookieUtils } from '@core/utils/cookie.ts';
import { Button } from '@packages';
import { useRouter } from '@tanstack/react-router';

const LoginPage = () => {
  const router = useRouter();

  const handleFakeLogin = () => {
    const fakeToken = 'eyJhGciOiJIUzI1Ni...';
    cookieUtils.setToken(fakeToken);
    router.navigate({ to: PATHS.HOME }); // və ya search.redirect
  };

  return (
    <div className="p-10">
      <h1>Login</h1>
      <Button onClick={handleFakeLogin} className="bg-blue-600 text-white px-4 py-2 rounded">
        Daxil ol (Simulyasiya)
      </Button>
    </div>
  );
};

export default LoginPage;
