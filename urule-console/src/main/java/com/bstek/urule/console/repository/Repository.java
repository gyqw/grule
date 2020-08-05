package com.bstek.urule.console.repository;

import com.bstek.urule.console.repository.model.RepositoryFile;
import lombok.Data;

import java.util.List;

@Data
public class Repository {
    private RepositoryFile rootFile;
    private List<String> projectNames;
}
