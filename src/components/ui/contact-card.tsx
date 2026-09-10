import React from 'react';
import { cn } from '@/lib/utils';
import {
	LucideIcon,
	PlusIcon,
} from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
	icon: LucideIcon;
	label: string;
	value: string;
	href?: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
	// Content props
	title?: string;
	description?: string;
	contactInfo?: ContactInfoProps[];
	formSectionClassName?: string;
};

export function ContactCard({
	title = 'Contact With Us',
	description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
	contactInfo,
	className,
	formSectionClassName,
	children,
	...props
}: ContactCardProps) {
	return (
		<div
			className={cn(
					// In light mode --card (#FFFFFF) sits on --background (#F8FAFC),
				// a ~2% gap that reads as no card at all. Dark mode has a real
				// surface jump, which is why it already looked fine. Elevation
				// has to carry the separation in light, so the shadow is
				// deliberately heavier there than in dark.
				'bg-card border-border ring-border/60 relative grid h-full w-full border ring-1',
				'shadow-[0_24px_70px_-20px_rgba(15,23,42,0.28)]',
				'dark:shadow-[0_24px_70px_-20px_rgba(0,0,0,0.75)]',
				'md:grid-cols-2 lg:grid-cols-3',
				className,
			)}
			{...props}
		>
			<PlusIcon className="absolute -top-3 -left-3 h-6 w-6" />
			<PlusIcon className="absolute -top-3 -right-3 h-6 w-6" />
			<PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6" />
			<PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6" />
			<div className="flex flex-col justify-between lg:col-span-2">
				<div className="relative h-full space-y-4 px-4 py-8 md:p-8">
					<h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
						{title}
					</h1>
					<p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
						{description}
					</p>
					<div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
						{contactInfo?.map((info, index) => (
							<ContactInfo key={index} {...info} />
						))}
					</div>
				</div>
			</div>
			<div
				className={cn(
					'bg-primary/5 flex h-full w-full items-center border-t p-5 md:col-span-1 md:border-t-0 md:border-l',
					formSectionClassName,
				)}
			>
				{children}
			</div>
		</div>
	);
}

function ContactInfo({
	icon: Icon,
	label,
	value,
	href,
	className,
	...props
}: ContactInfoProps) {
	const content = (
		<>
			<div className="bg-primary/5 border-border/60 rounded-lg border p-3">
				<Icon className="h-5 w-5" />
			</div>
			<div>
				<p className="font-medium">{label}</p>
				<p className="text-muted-foreground text-xs">{value}</p>
			</div>
		</>
	);

	if (href) {
		return (
			<a
				href={href}
				className={cn('flex items-center gap-3 py-3 hover:opacity-70 transition-opacity', className)}
			>
				{content}
			</a>
		);
	}

	return (
		<div className={cn('flex items-center gap-3 py-3', className)} {...props}>
			{content}
		</div>
	);
}
