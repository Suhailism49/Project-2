import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, CreditCard } from 'lucide-react';

// Mock data voor rekeningen
const initialAccounts = [
  { id: 1, name: 'Betaalrekening', balance: 1250.75, type: 'Current' },
  { id: 2, name: 'Spaarrekening', balance: 5000.00, type: 'Savings' },
  { id: 3, name: 'Zakelijke Rekening', balance: 3500.50, type: 'Business' }
];

const AccountDashboard = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [newAccount, setNewAccount] = useState({ name: '', type: '' });
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  const handleAddAccount = () => {
    if (newAccount.name && newAccount.type) {
      const account = {
        id: accounts.length + 1,
        name: newAccount.name,
        balance: 0,
        type: newAccount.type
      };
      setAccounts([...accounts, account]);
      setNewAccount({ name: '', type: '' });
      setIsAddingAccount(false);
    }
  };

  const getAccountTypeColor = (type) => {
    switch(type) {
      case 'Savings': return 'bg-green-100';
      case 'Business': return 'bg-blue-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mijn Rekeningen</h1>
      
      <div className="grid md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <Card 
            key={account.id} 
            className={`${getAccountTypeColor(account.type)} shadow-md hover:shadow-lg transition-shadow`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {account.name}
              </CardTitle>
              <CreditCard className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">
                € {account.balance.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-gray-500">Rekening Type: {account.type}</p>
            </CardContent>
          </Card>
        ))}

        <Card 
          className="bg-white border-dashed border-2 border-gray-300 hover:border-blue-300 transition-colors cursor-pointer"
          onClick={() => setIsAddingAccount(true)}
        >
          <CardContent className="flex items-center justify-center h-full">
            <div className="text-center">
              <PlusCircle className="mx-auto mb-2 text-gray-400" size={40} />
              <p className="text-gray-600">Nieuwe Rekening Toevoegen</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isAddingAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6">
            <h2 className="text-xl font-semibold mb-4">Nieuwe Rekening Aanmaken</h2>
            <div className="space-y-4">
              <Input 
                placeholder="Rekeningnaam" 
                value={newAccount.name}
                onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
              />
              <select 
                className="w-full p-2 border rounded"
                value={newAccount.type}
                onChange={(e) => setNewAccount({...newAccount, type: e.target.value})}
              >
                <option value="">Selecteer Rekeningtype</option>
                <option value="Current">Betaalrekening</option>
                <option value="Savings">Spaarrekening</option>
                <option value="Business">Zakelijke Rekening</option>
              </select>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsAddingAccount(false)}>
                  Annuleren
                </Button>
                <Button onClick={handleAddAccount}>
                  Rekening Toevoegen
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AccountDashboard;