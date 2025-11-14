'use client';
import { Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from './grid-feature-cards';

const features = [
	{
		title: 'Fast',
		icon: Zap,
		description: 'Our code is optimized and ready for production',
	},
	{
		title: 'Powerful',
		icon: Cpu,
		description: 'Powerful, strong and top notch algorithms shipped',
	},
	{
		title: 'Security',
		icon: Fingerprint,
		description: 'Sealed, safe and secure code passing all security tests and simulations',
	},
	{
		title: 'Customization',
		icon: Pencil,
		description: 'Ready to be customed to your buisness needs',
	},
	{
		title: 'Control',
		icon: Settings2,
		description: 'Have full controll and monitor your software with our implementation that are made for admins and users',
	},
	{
		title: 'Built for AI',
		icon: Sparkles,
		description: 'We integrate AI in everything, yes everything',
	},
];

export default function FeatureCardsDemo() {
	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto w-full max-w-5xl space-y-8 px-4">
				<AnimatedContainer className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl text-white font-bold tracking-wide text-balance md:text-6xl lg:text-5xl ">
						Power. Speed. Control.
					</h2>
					<p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
						Everything you need to build fast, secure, scalable apps.
					</p>
				</AnimatedContainer>

				<AnimatedContainer
					delay={0.4}
					className="grid grid-cols-1 divide-x divide-y border  sm:grid-cols-2 md:grid-cols-3"
				>
					{features.map((feature, i) => (
						<FeatureCard key={i} feature={feature} />
					))}
				</AnimatedContainer>
			</div>
		</section>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: React.ComponentProps<typeof motion.div>['className'];
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
