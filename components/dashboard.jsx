"use client"

import { 
  ChartLine, 
  LayoutHeaderCellsLarge, 
  Gear, 
  Flame, 
  ChartDonut, 
  Person, 
  CircleCheck,
  ArrowRightToSquare,
  FolderPlus,
  Bell,
  Rocket
} from '@gravity-ui/icons';
import {TriangleExclamation} from "@gravity-ui/icons";
import { authClient } from '@/app/lib/auth-client';
// import { router } from 'better-auth/api';
import { useRouter } from 'next/navigation';
import { useRecentFlows } from '@/hooks/flows';
import { useEffect, useState, useTransition } from 'react';
import { AlertDialog, Button, Modal} from '@heroui/react';
import {Input, Label,Surface, TextField} from "@heroui/react";


const Dashboard = ({deleteUser, addUser}) => {
     const router = useRouter();
     const [isDeleting, startTransition] = useTransition();

    //  const [flowsData , setFlowsData] = useState([])
  
    const handleLogout =()=>{
        authClient.signOut()
        router.push("/signin");
    }
  
      const {
          data: session,
          isPending, //loading state
          refetch
      } = authClient.useSession()


      if (!session){
        router.push("/signin");
    }


  const stats = [
    { title: 'Total Revenue', value: '$24,500', trend: '+12.5%', icon: <Flame className="text-orange-600" /> },
    { title: 'Active Projects', value: '12', trend: '+2', icon: <LayoutHeaderCellsLarge className="text-purple-600" /> },
    { title: 'Hours Logged', value: '184h', trend: '-5%', icon: <ChartLine className="text-blue-600" /> },
    { title: 'Success Rate', value: '98%', trend: '+0.5%', icon: <CircleCheck className="text-emerald-600" /> },
  ];

        
       const {data , loading} = useRecentFlows()
       console.log(data)



  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      
      {/* Sidebar - Clean Light Glass */}
      <aside className="w-20 lg:w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200 flex flex-col p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center">
            <ChartDonut width={24} height={24} className="text-white" />
          </div>
          <span className="hidden lg:block font-bold text-xl tracking-tight text-slate-800">Project<span className="text-blue-600">Manager</span></span>
        </div>

        <nav className="flex flex-col justify-start items-start space-y-3">
            <button className='btn shadow-none bg-white text-black border-none'><LayoutHeaderCellsLarge /> Overview</button>
            <button className='btn shadow-none bg-white text-black border-none'><ChartLine /> Analytics</button>
            <button className='btn shadow-none bg-white text-black border-none'><Person /> Team</button>
            <button className='btn shadow-none bg-white text-black border-none'><Gear /> Settings</button>
            
      
      <Modal>
      <Button className='shadow-none bg-white text-black border-none'><FolderPlus /> Add Activity</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <FolderPlus className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Add new task</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form action={addUser} className="flex flex-col gap-4">
                  <TextField className="w-full" name="user" type="text">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  </TextField>
                  <TextField className="w-full" name="task" type="text">
                    <Label>Task</Label>
                    <Input placeholder="Task Details" />
                  </TextField>
                  <TextField className="w-full" name="time" type="text">
                    <Label>Time</Label>
                    <Input placeholder="Time" />
                  </TextField>
                  <TextField className="w-full" name="status">
                    <Label>Status</Label>
                    <Input placeholder="Status" />
                  </TextField>
                  <div className='flex justify-between'><Button type='submit'>Add Task</Button>
                  <Button slot="close" variant="secondary">
                Cancel
              </Button></div>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              
              
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
            
            <Button onClick={handleLogout} variant='danger'><ArrowRightToSquare /> Logout</Button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-violet-500 shadow-sm" />
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-slate-800">{session?.user?.name || 'User'}</p>
            <p className="text-xs text-slate-500">Pro Developer</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome <span className='text-blue-600'>{session?.user?.name || 'there'} </span></h1>
            <p className="text-slate-500 mt-1">Good afternoon! Here's what's happening today.</p>
          </div>
          <button className="relative p-2.5 bg-white rounded-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm text-slate-600">
            <Bell width={20} height={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-400/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                  {stat.icon}
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area Placeholder */}
          <div className="lg:col-span-2 p-8 bg-white border border-slate-200 rounded-3xl min-h-[350px] flex items-center justify-center relative overflow-hidden shadow-sm">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50/30 opacity-50 pointer-events-none" />
             <p className="text-slate-400 font-medium z-10">Analytics Visualization Placeholder</p>
          </div>

          {/* Recent Activity */}
          <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Flame className="text-orange-500" /> Recent Flows
            </h3>
            <div className="space-y-6">
              {data.map((act) => (
                <div key={act.id} className="flex justify-between items-start gap-4">
                  <div className='flex gap-4'>
                    <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.3)]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{act.task}</p>
                    <p className="text-xs text-slate-500">{act.user} • {act.time}</p>
                  </div>
                  </div>
                  
                  <AlertDialog>
      <Button variant="danger">Delete</Button>
      <AlertDialog.Backdrop
        className="bg-linear-to-t from-red-950/90 via-red-950/50 to-transparent dark:from-red-950/95 dark:via-red-950/60"
        variant="blur"
      >
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="items-center text-center">
              <AlertDialog.Icon status="danger">
                <TriangleExclamation className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Permanently delete the data?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This action cannot be undone. All your data, settings, and content will be
                permanently removed from our servers. The dramatic red backdrop emphasizes the
                severity and irreversibility of this decision.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex-col-reverse">
              <Button slot="close" onClick={()=>startTransition(()=>deleteUser(act._id))} variant='danger' isLoading={isDeleting}>Delete</Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-component for Sidebar Items
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 px-3.5 py-3 rounded-2xl cursor-pointer transition-all ${
    active 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
  }`}>
    {React.cloneElement(icon, { width: 20, height: 20 })}
    <span className="hidden lg:block font-semibold text-sm">{label}</span>
  </div>
);

export default Dashboard;