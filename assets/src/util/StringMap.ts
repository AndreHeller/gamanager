module util {
	export class StringMap<V> {
		private VALUES: {[key: string]: V;} = {};
		private size: number = 0;
		private NAMES: Array<string> = [];
		
		
		public put(key: string, value: V){
			this.VALUES[key] = value;
			this.size++;
			this.NAMES.push(key);
		}
		
		public get(key: string): V{
			return this.VALUES[key];
		}
		
		public names(): Array<string>{
			return this.NAMES;
		}
		
		public getSize(): number{
			return this.size;
		}
		
		public flush(){
			this.NAMES = [];
			this.size = 0;
			this.VALUES = {};
		}
	}
}