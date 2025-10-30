import './App.css';
import TreeView from './components/TreeView';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-6">
      <section className="rounded-2xl bg-white p-6 md:p-8 shadow-lg ring-1 ring-slate-100">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            JSON Tree Visualizer
          </h1>
        </header>

        <TreeView />
      </section>
    </main>
  );
}

