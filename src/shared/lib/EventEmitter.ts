export const EventsMap = {
  refreshTokenExpired: 'refreshTokenExpired',
} as const;

type Events = keyof typeof EventsMap;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionArgs = any[];

type Function = (...args: FunctionArgs) => void;

class EventEmitterService {
  private events: Record<Events, Function[]> = {
    refreshTokenExpired: [],
  };

  on(event: Events, listener: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event: Events, listener: Function) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event: Events, ...args: FunctionArgs) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }
  }
}

export const EventEmitter = new EventEmitterService();
