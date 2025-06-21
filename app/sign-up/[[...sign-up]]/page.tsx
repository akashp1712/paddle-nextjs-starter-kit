import { SignUp } from '@clerk/nextjs';
import { LoginGradient } from '@/components/gradients/login-gradient';
import '../../../styles/login.css';

export default function SignUpPage() {
  return (
    <div>
      <LoginGradient />
      <div className={'flex flex-col items-center justify-center min-h-screen'}>
        <div className={'mt-[112px]'}>
          <SignUp
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'bg-background/80 backdrop-blur-[6px] border border-border',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
