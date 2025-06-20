'use client';
type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function BoardTabs({ activeTab, setActiveTab }: Props) {
  const tabs = ['notes', 'external', 'tasks', 'calendar', 'events'];

  return (
    <div className="md:hidden mb-4">
      <div className="flex border-b border-amber-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-1 text-center text-sm font-medium ${
              activeTab === tab
                ? 'border-b-2 border-amber-600 text-amber-700'
                : 'text-amber-600 hover:text-amber-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
