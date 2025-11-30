import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";

export interface BankAccount {
  id: string;
  name: string;
  last4: string;
  balance: number;
  color: string;
  logo?: string;
}

interface BankAccountCarouselProps {
  accounts: BankAccount[];
  selectedAccount: string | null;
  onSelectAccount: (accountId: string | null) => void;
}

export function BankAccountCarousel({
  accounts,
  selectedAccount,
  onSelectAccount,
}: BankAccountCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const allAccountsCard = {
    id: "all",
    name: "All Accounts",
    last4: "",
    balance: accounts.reduce((sum, acc) => sum + acc.balance, 0),
    color: "bg-gradient-to-br from-slate-700 to-slate-900",
  };

  const allCards = [allAccountsCard, ...accounts];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 320; // card width + gap
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(
              container.scrollWidth - container.clientWidth,
              scrollPosition + scrollAmount,
            );

      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current
    ? scrollPosition <
      scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth -
        10
    : false;

  return (
    <div className="mb-8 relative">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-4 px-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {allCards.map((account) => {
          const isSelected =
            (selectedAccount === null && account.id === "all") ||
            selectedAccount === account.id;

          return (
            <div key={account.id} className="flex-shrink-0 w-80">
              <button
                onClick={() =>
                  onSelectAccount(account.id === "all" ? null : account.id)
                }
                className={`w-full text-left transition-all duration-300 ${
                  isSelected
                    ? "scale-105 opacity-100"
                    : "opacity-40 hover:opacity-60 blur-[1px] hover:blur-0"
                }`}
              >
                <div
                  className={`${account.color} rounded-2xl p-6 h-48 text-white shadow-xl relative overflow-hidden`}
                >
                  {/* Card Design Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/80 text-sm mb-1">
                          {account.id === "all" ? "Total Balance" : "Balance"}
                        </p>
                        <p className="text-3xl">
                          €
                          {account.balance.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="bg-white/20 p-2 rounded-lg">
                        <CreditCard className="w-6 h-6" />
                      </div>
                    </div>

                    <div>
                      <p className="mb-2">{account.name}</p>
                      {account.last4 && (
                        <p className="text-white/80 text-sm tracking-wider">
                          •••• •••• •••• {account.last4}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-slate-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-slate-700" />
        </button>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
