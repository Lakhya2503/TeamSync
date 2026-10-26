import React, { useState } from 'react'
import {
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaCrown,
  FaLayerGroup,
  FaGlobe,
  FaLock,
  FaUserTie,
  FaBuilding,
} from 'react-icons/fa'
import { FiCalendar, FiCheckCircle, FiClock, FiUsers as FiUsersIcon } from 'react-icons/fi'

// shadcn/ui primitives
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Card, CardContent } from '../../../components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#components/ui/select'
import { Textarea } from '#components/ui/textarea'

// --- clay tokens ---------------------------------------------------------
const clayRaised =
  'bg-[#e0e5ec] shadow-[8px_8px_20px_#b8bec7,-8px_-8px_20px_#ffffff]'
const clayRaisedSm =
  'bg-[#e0e5ec] shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff]'
const clayInset =
  'bg-[#e0e5ec] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]'
const clayPuck =
  'flex items-center justify-center rounded-2xl bg-[#e0e5ec] shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff]'
const clayButton =
  'bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-white font-bold ' +
  'shadow-[6px_6px_14px_#b8bec7,-6px_-6px_14px_#ffffff] ' +
  'transition-all duration-150 hover:from-[#6b8cf4] hover:to-[#9d7cf8] ' +
  'hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] ' +
  'active:shadow-[inset_4px_4px_10px_rgba(90,70,200,0.4),inset_-4px_-4px_10px_rgba(255,255,255,0.5)]'

const clayField =
  'border-none bg-[#e0e5ec] text-[#4a5568] placeholder-[#a0aec0] ' +
  'shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff] ' +
  'focus-visible:ring-2 focus-visible:ring-indigo-300/50 focus-visible:ring-offset-0'

// --- types ---------------------------------------------------------------
type TeamVisibility = 'Public' | 'Private'
type TeamStatus = 'Active' | 'Archived' | 'Planning'

interface Team {
  id: number
  name: string
  description: string
  department: string
  lead: string
  visibility: TeamVisibility
  status: TeamStatus
  memberCount: number
  createdAt: string
}

interface TeamFormData {
  name: string
  description: string
  department: string
  lead: string
  visibility: TeamVisibility
  status: TeamStatus
  memberCount: number
}

const initialFormData: TeamFormData = {
  name: '',
  description: '',
  department: '',
  lead: '',
  visibility: 'Public',
  status: 'Active',
  memberCount: 0,
}

const AdminTeam = () => {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: 1,
      name: 'Design Sprint',
      description: 'Product design and rapid prototyping squad.',
      department: 'Design',
      lead: 'Sarah Johnson',
      visibility: 'Public',
      status: 'Active',
      memberCount: 8,
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Project Alpha',
      description: 'Core platform engineering team.',
      department: 'Engineering',
      lead: 'Michael Chen',
      visibility: 'Private',
      status: 'Active',
      memberCount: 12,
      createdAt: '2024-02-01',
    },
    {
      id: 3,
      name: 'Marketing Q4',
      description: 'Q4 campaign planning and execution.',
      department: 'Marketing',
      lead: 'Emily Rodriguez',
      visibility: 'Public',
      status: 'Planning',
      memberCount: 5,
      createdAt: '2023-11-20',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<TeamFormData>(initialFormData)
  const [formError, setFormError] = useState<string | null>(null)

  const filteredTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.lead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingId(null)
    setFormError(null)
  }

  const openCreate = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEdit = (team: Team) => {
    setEditingId(team.id)
    setFormData({
      name: team.name,
      description: team.description,
      department: team.department,
      lead: team.lead,
      visibility: team.visibility,
      status: team.status,
      memberCount: team.memberCount,
    })
    setFormError(null)
    setIsDialogOpen(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    if (!formData.name.trim() || !formData.department.trim() || !formData.lead.trim()) {
      setFormError('Team name, department, and lead are required.')
      return
    }

    if (editingId !== null) {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === editingId
            ? {
                ...t,
                name: formData.name,
                description: formData.description,
                department: formData.department,
                lead: formData.lead,
                visibility: formData.visibility,
                status: formData.status,
                memberCount: Number(formData.memberCount) || 0,
              }
            : t
        )
      )
    } else {
      const newTeam: Team = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        department: formData.department,
        lead: formData.lead,
        visibility: formData.visibility,
        status: formData.status,
        memberCount: Number(formData.memberCount) || 0,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setTeams((prev) => [newTeam, ...prev])
    }

    setIsDialogOpen(false)
    resetForm()
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this team?')) {
      setTeams((prev) => prev.filter((t) => t.id !== id))
    }
  }

  const getStatusBadge = (status: TeamStatus) => {
    const config = {
      Active: { color: 'bg-emerald-100 text-emerald-700', icon: <FiCheckCircle className="mr-1" /> },
      Archived: { color: 'bg-rose-100 text-rose-700', icon: <FiClock className="mr-1" /> },
      Planning: { color: 'bg-amber-100 text-amber-700', icon: <FiClock className="mr-1" /> },
    }
    const c = config[status]
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${c.color}`}>
        {c.icon}
        {status}
      </span>
    )
  }

  return (
    <div className="min-h-full bg-[#e0e5ec] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#4a5568] md:text-3xl">Team Management</h1>
            <p className="mt-1 text-sm font-medium text-[#718096]">
              Create and manage teams across your organization
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openCreate}
                className={`mt-3 inline-flex items-center rounded-2xl px-4 py-2 md:mt-0 ${clayButton}`}
              >
                <FaPlus className="mr-2" />
                Create Team
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
              <div className={`rounded-[1.5rem] p-6 ${clayRaised}`}>
                <DialogHeader>
                  <DialogTitle className="text-xl font-extrabold text-[#4a5568]">
                    {editingId !== null ? 'Edit Team' : 'Create New Team'}
                  </DialogTitle>
                  <DialogDescription className="text-sm font-medium text-[#718096]">
                    {editingId !== null
                      ? 'Update this team’s details.'
                      : 'Set up a new team with a name, lead, and access settings.'}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {formError && (
                    <div className={`rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 ${clayInset}`}>
                      {formError}
                    </div>
                  )}

                  {/* Team Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-bold text-[#4a5568]">
                      Team Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Design Sprint"
                      className={`h-auto rounded-xl py-2.5 ${clayField}`}
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-sm font-bold text-[#4a5568]">
                      Description <span className="text-[#a0aec0]">(optional)</span>
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="What is this team working on?"
                      className={`resize-none rounded-xl ${clayField}`}
                    />
                  </div>

                  {/* Department & Lead */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="department" className="text-sm font-bold text-[#4a5568]">
                        Department
                      </Label>
                      <Input
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Engineering"
                        className={`h-auto rounded-xl py-2.5 ${clayField}`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="lead" className="text-sm font-bold text-[#4a5568]">
                        Team Lead
                      </Label>
                      <Input
                        id="lead"
                        name="lead"
                        value={formData.lead}
                        onChange={handleChange}
                        placeholder="Sarah Johnson"
                        className={`h-auto rounded-xl py-2.5 ${clayField}`}
                      />
                    </div>
                  </div>

                  {/* Visibility & Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-bold text-[#4a5568]">Visibility</Label>
                      <Select
                        value={formData.visibility}
                        onValueChange={(value) =>
                          setFormData({ ...formData, visibility: value as TeamVisibility })
                        }
                      >
                        <SelectTrigger className={`h-auto rounded-xl py-2.5 ${clayField}`}>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Public">Public</SelectItem>
                          <SelectItem value="Private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-sm font-bold text-[#4a5568]">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData({ ...formData, status: value as TeamStatus })
                        }
                      >
                        <SelectTrigger className={`h-auto rounded-xl py-2.5 ${clayField}`}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Initial Member Count */}
                  <div className="space-y-1.5">
                    <Label htmlFor="memberCount" className="text-sm font-bold text-[#4a5568]">
                      Initial Member Count <span className="text-[#a0aec0]">(optional)</span>
                    </Label>
                    <Input
                      id="memberCount"
                      name="memberCount"
                      type="number"
                      min={0}
                      value={formData.memberCount}
                      onChange={handleChange}
                      placeholder="0"
                      className={`h-auto rounded-xl py-2.5 ${clayField}`}
                    />
                  </div>

                  <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
                    <Button
                      type="button"
                      onClick={() => setIsDialogOpen(false)}
                      className={`rounded-xl text-[#4a5568] ${clayRaisedSm} hover:shadow-[8px_8px_18px_#b8bec7,-8px_-8px_18px_#ffffff] active:shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff]`}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className={`rounded-xl ${clayButton}`}>
                      {editingId !== null ? 'Save Changes' : 'Create Team'}
                    </Button>
                  </DialogFooter>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className={`mb-6 rounded-[1.75rem] p-4 ${clayRaised}`}>
          <div className="relative max-w-sm">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0aec0]" />
            <input
              type="text"
              placeholder="Search by team, lead, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border-none bg-[#e0e5ec] py-2 pl-10 pr-4 text-sm font-medium text-[#4a5568] placeholder-[#a0aec0] shadow-[inset_4px_4px_10px_#b8bec7,inset_-4px_-4px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-indigo-300/50 focus:ring-offset-0"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a0aec0] hover:text-[#4a5568]"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Teams grid */}
        {filteredTeams.length === 0 ? (
          <div className={`rounded-[1.75rem] p-12 text-center ${clayRaised}`}>
            <div className={`mx-auto mb-3 h-16 w-16 ${clayPuck}`}>
              <FaLayerGroup className="text-2xl text-[#a0aec0]" />
            </div>
            <p className="font-bold text-[#718096]">No teams found</p>
            <p className="mt-1 text-sm text-[#a0aec0]">
              {searchTerm ? 'Try a different search.' : 'Create your first team to get started.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeams.map((team) => (
              <Card
                key={team.id}
                className={`rounded-[1.75rem] border-none p-0 transition-transform duration-200 hover:-translate-y-1 ${clayRaised}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c9cf5] to-[#a78bfa] text-white shadow-[inset_2px_2px_5px_rgba(90,70,200,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.4)]">
                        <FaLayerGroup className="text-lg" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#4a5568]">{team.name}</p>
                        <p className="flex items-center text-xs font-medium text-[#a0aec0]">
                          <FaBuilding className="mr-1 h-3 w-3" />
                          {team.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(team)}
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-indigo-500 ${clayRaisedSm} hover:shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff] active:shadow-[inset_3px_3px_7px_#b8bec7,inset_-3px_-3px_7px_#ffffff]`}
                      >
                        <FaEdit size={11} />
                      </button>
                      <button
                        onClick={() => handleDelete(team.id)}
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-rose-500 ${clayRaisedSm} hover:shadow-[5px_5px_12px_#b8bec7,-5px_-5px_12px_#ffffff] active:shadow-[inset_3px_3px_7px_#b8bec7,inset_-3px_-3px_7px_#ffffff]`}
                      >
                        <FaTrash size={11} />
                      </button>
                    </div>
                  </div>

                  {team.description && (
                    <p className="mt-3 line-clamp-2 text-xs font-medium text-[#718096]">
                      {team.description}
                    </p>
                  )}

                  <div className="mt-4 space-y-2">
                    <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${clayInset}`}>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#a0aec0]">Lead</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-[#4a5568]">
                        <FaUserTie className="text-indigo-500" />
                        {team.lead}
                      </span>
                    </div>

                    <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${clayInset}`}>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#a0aec0]">Members</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-[#4a5568]">
                        <FiUsersIcon className="text-indigo-400" />
                        {team.memberCount}
                      </span>
                    </div>

                    <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${clayInset}`}>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#a0aec0]">Visibility</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-[#4a5568]">
                        {team.visibility === 'Public' ? (
                          <FaGlobe className="text-emerald-500" />
                        ) : (
                          <FaLock className="text-amber-500" />
                        )}
                        {team.visibility}
                      </span>
                    </div>

                    <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${clayInset}`}>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#a0aec0]">Created</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#718096]">
                        <FiCalendar className="text-indigo-400" />
                        {new Date(team.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-center">{getStatusBadge(team.status)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Total Teams', value: teams.length, icon: FaLayerGroup, color: 'text-indigo-500' },
            { label: 'Active', value: teams.filter((t) => t.status === 'Active').length, icon: FiCheckCircle, color: 'text-emerald-500' },
            { label: 'Public', value: teams.filter((t) => t.visibility === 'Public').length, icon: FaGlobe, color: 'text-violet-500' },
            { label: 'Total Members', value: teams.reduce((s, t) => s + t.memberCount, 0), icon: FaUsers, color: 'text-amber-500' },
          ].map((stat, idx) => (
            <div key={idx} className={`rounded-[1.75rem] p-4 ${clayRaised}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#718096]">{stat.label}</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#4a5568]">{stat.value}</p>
                </div>
                <div className={`h-11 w-11 ${clayPuck}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminTeam