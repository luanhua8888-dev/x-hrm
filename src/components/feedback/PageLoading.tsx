import { HeartWaveLoader } from '@/components/feedback/HeartWaveLoader';
import { LOADING_TEXT } from '@/components/feedback/loading.constants';

export function PageLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <HeartWaveLoader
        label={LOADING_TEXT.page}
        className="h-32 w-32 text-primary sm:h-40 sm:w-40"
      />
    </div>
  );
}
