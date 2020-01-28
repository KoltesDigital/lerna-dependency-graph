declare module '@lerna/package' {
	export class Package {
		readonly dependencies?: { [name: string]: string };
		readonly devDependencies?: { [name: string]: string };
		readonly name: string;
		readonly peerDependencies?: { [name: string]: string };
		readonly private: boolean;
	}
}

declare module '@lerna/project' {
	import { Package } from '@lerna/package';
	export function getPackages(): Promise<Package[]>;
}
