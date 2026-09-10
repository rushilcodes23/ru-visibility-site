import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, MailIcon } from "lucide-react";

export function NotFound() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
			<Empty>
				<EmptyHeader>
					<EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
						404
					</EmptyTitle>
					<EmptyDescription className="-mt-8 text-foreground/80">
						The page you're looking for might have been <br />
						moved or doesn't exist.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button
							render={
								<a href="/">
									<HomeIcon className="size-4 mr-2" data-icon="inline-start" />
									Go Home
								</a>
							}
						/>

						<Button
							variant="outline"
							render={
								<a href="/contact">
									<MailIcon className="size-4 mr-2" data-icon="inline-start" />
									Talk to Us
								</a>
							}
						/>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
