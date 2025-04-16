export default function useMenuApi() {
  const menu = ref([])
  const error = ref(null)
  const status = ref('idle')
  const searchQuery = ref('')
  const selectedFilters = ref('All')
  const sortOrder = ref('')

  const fetchMenu = async () => {
    status.value = 'pending'
    error.value = null
    
    try {
      // Simplified API call - just get all menu items at once
      const endpoint = '/menu/getMenuStatic'
      const { data, error: apiError } = await useAsyncApi(endpoint)
      
      if (apiError.value) {
        throw new Error(apiError.value?.message || 'Failed to fetch menu')
      }

      if (!data.value) {
        throw new Error('No data received from server')
      }

      const response = data.value
      
      // Handle successful response
      if (response.success && response.results) {
        // Extract items from different response structures
        menu.value = Array.isArray(response.results) 
          ? response.results 
          : response.results.items || response.results.data || []
      } else if (Array.isArray(response)) {
        // Handle simple array response
        menu.value = response
      } else {
        throw new Error('Invalid response format from server')
      }

      status.value = menu.value.length ? 'success' : 'empty'
      
    } catch (err) {
      error.value = err.message
      status.value = 'error'
      console.error('Menu API Error:', err)
    }
  }

  const resetFilters = () => {
    selectedFilters.value = 'All'
    searchQuery.value = ''
    sortOrder.value = ''
  }

  const filteredMenu = computed(() => {
    if (!menu.value || menu.value.length === 0) return []

    let filtered = [...menu.value]

    // Client-side filtering
    if (selectedFilters.value !== 'All') {
      filtered = filtered.filter(item => 
        item.category && 
        item.category.toLowerCase() === selectedFilters.value.toLowerCase()
      )
    }

    // Client-side search
    if (searchQuery.value.trim() !== '') {
      const query = searchQuery.value.toLowerCase().trim()
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query))
      )
    }

    return filtered
  })

  const sortedMenu = computed(() => {
    if (!filteredMenu.value.length) return []

    const sorted = [...filteredMenu.value]

    switch (sortOrder.value) {
      case 'asc': return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case 'desc': return sorted.sort((a, b) => b.name.localeCompare(a.name))
      case 'low-high': return sorted.sort((a, b) => a.price - b.price)
      case 'high-low': return sorted.sort((a, b) => b.price - a.price)
      default: return sorted
    }
  })

  return {
    menu,
    error,
    status,
    searchQuery,
    selectedFilters,
    sortOrder,
    filteredMenu,
    sortedMenu,
    fetchMenu,
    resetFilters
  }
}