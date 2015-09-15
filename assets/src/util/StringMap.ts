module util {
	export class StringMap<V> {
		private VALUES: {[key: string]: V;} = {};
		private _size: number = 0;
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
		
		public get size(): number{
			return this._size;
		}
	}
}