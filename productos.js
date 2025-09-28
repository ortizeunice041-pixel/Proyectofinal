function goBack() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/'; // Página de inicio si no hay historial
      }
    }


